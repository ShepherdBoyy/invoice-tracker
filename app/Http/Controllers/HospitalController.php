<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHospitalRequest;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateHospitalRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Models\Hospital;
use App\Models\Invoice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use function Symfony\Component\Clock\now;

class HospitalController extends Controller
{
    public function index(Request $request)
    {
        $searchQuery = $request->query("search");
        $perPage = $request->query("per_page", 10);

        $hospitals = Hospital::withCount("invoices")
            ->when($searchQuery, function ($query) use ($searchQuery) {
                $query->where(function ($q) use ($searchQuery) {
                    $q->where("hospital_name", "like", "%{$searchQuery}%")
                        ->orWhere("hospital_number", "like", "%{$searchQuery}%");
                });
            })
            ->orderBy("created_at", "desc")
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render("Hospitals/Index", [
            "hospitals" => $hospitals
        ]);
    }

    public function store(StoreHospitalRequest $request)
    {
        $validated = $request->validated();

        Hospital::create($validated);

        return back()->with("success", true);
    }

    public function show(Request $request)
    {
        $hospitalId = $request->hospital_id;
        $searchQuery = $request->query("search");
        $processingFilter = $request->processing_days;
        $perPage = $request->query("per_page", 10);

        $invoices = Invoice::query()
            ->with(["hospital", "creator"])
            ->select("invoices.*")
            ->addSelect([
                "processing_days" => function ($query) {
                    $query->selectRaw("
                        CASE
                            WHEN date_closed IS NOT NULL THEN 0
                            ELSE DATEDIFF(due_date, CURDATE())
                        END
                    ");
                }
            ])
            ->when($hospitalId, function ($query) use ($hospitalId) {
                $query->where("hospital_id", $hospitalId);
            })
            ->when($searchQuery, function ($query) use ($searchQuery) {
                $query->where("invoice_number", "like", "%{$searchQuery}%");
            })
            ->when(!$searchQuery && $processingFilter, function ($query) use ($processingFilter) {
                match ($processingFilter) {
                    "Current" => $query->having("processing_days", ">", 0),
                    "30-days" => $query->havingBetween("processing_days", [-30, -1]),
                    "31-60-days" => $query->havingBetween("processing_days", [-60, -31]),
                    "61-90-days" => $query->havingBetween("processing_days", [-90, -61]),
                    "91-over" => $query->having("processing_days", "<=", -91),
                    "Closed" => $query->having("processing_days", "=", 0),
                    default => null,
                };
            })
            ->orderBy("due_date", "desc")
            ->paginate($perPage)
            ->withQueryString();
        
        return Inertia::render("Hospitals/Show", [
            "invoices" => $invoices,
            "hospital" => $hospitalId 
                ? Hospital::withCount("invoices")->find($hospitalId) 
                : null,
            "searchQuery" => $searchQuery,
            "processingFilter" => $processingFilter ?? "30-days",
        ]);
    }

    public function update(UpdateHospitalRequest $request, string $id)
    {
        $hospital = Hospital::findOrFail($id);

        $validated = $request->validated();

        $hospital->update($validated);

        return back()->with("success", true);
    }

    public function destroy(string $id)
    {
        $hospital = Hospital::findOrFail($id);
        $hospital->delete();

        return back()->with("success", true);
    }

    public function createInvoice()
    {
        return Inertia::render("Hospitals/elements/CreateInvoice", [
            "hospitalId" => request("hospital_id")
        ]);
    }

    public function storeInvoice(StoreInvoiceRequest $request)
    {
        $validated = $request->validated();
        $validated['created_by'] = Auth::id();

        $today = Carbon::today();
        $dueDate = Carbon::parse($validated["due_date"])->startOfDay();

        if (!empty($validated["date_closed"])) {
            $validated["status"] = "closed";
        } else {
            $validated["status"] = $today->greaterThan($dueDate)
                ? "overdue"
                : "open";
        }

        $invoice = Invoice::create($validated);

        $invoice->history()->create([
            "updated_by" => Auth::id(),
            "description" => "Invoice has been created"
        ]);

        return back()->with("success", true);
    }

    public function editInvoice(string $id)
    {
        $invoice = Invoice::with(["hospital", "creator"])
                        ->findOrFail($id);

        return Inertia::render("Hospitals/elements/EditInvoice", [
            "invoice" => $invoice,
            "editor" => Auth::user()
        ]);
    }

    public function deleteInvoice(Request $request, $hospital_id)
    {
        $validated = $request->validate([
            "ids" => ["required", "array", "min:1"],
            "ids.*" => ["integer", "exists:invoices,id"]
        ]);

        Invoice::where("hospital_id", $hospital_id)
            ->whereIn("id", $validated["ids"])
            ->delete();

        return back()->with("success", true);
    }
}
