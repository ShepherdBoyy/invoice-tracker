<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceHistory;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class InvoiceHistoryController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize("viewAny", InvoiceHistory::class);

        $invoiceId = $request->invoice_id;

        $invoice = Invoice::with(["hospital", "creator"])->findOrFail($invoiceId);

        $history = InvoiceHistory::where("invoice_id", $invoiceId)
            ->with(["updater"])
            ->orderBy("updated_at", "desc")
            ->get();

        return Inertia::render("InvoiceHistory/Index", [
            "invoice" => $invoice,
            "history" => $history,
            "editor" => Auth::user()->name,
            "breadcrumbs" => [
                ["label" => "Hospitals", "url" => "/hospitals"],
                ["label" => $invoice->hospital->hospital_name, "url" => "/hospitals/{$invoice->hospital_id}/invoices"],
                ["label" => $invoice->invoice_number, "url" => null]
            ]
        ]);
    }

    public function download(Request $request)
    {
        Gate::authorize("viewAny", InvoiceHistory::class);

        $invoiceId = $request->invoice_id;

        $invoice = Invoice::with(["hospital", "creator"])->findOrFail($invoiceId);

        $history = InvoiceHistory::where("invoice_id", $invoiceId)
            ->with(["updater"])
            ->orderBy("updated_at", "desc")
            ->get();
        
        $today = Carbon::today();
        $dueDate = Carbon::parse($invoice->due_date);

        $daysRemaining = $today->lessThanOrEqualTo($dueDate)
            ? $today->diffInDays($dueDate)
            : 0;
        
        $daysOverdue = $today->greaterThan($dueDate)
            ? $today->diffInDays($dueDate)
            : 0;
        
        $dateClosed = $invoice->date_closed
            ? Carbon::parse($invoice->date_closed)->format('m/d/Y')
            : null;
        
        $pdf = Pdf::loadView("pdf.invoice", [
            "invoice" => $invoice,
            "history" => $history,
            "daysRemaining" => $daysRemaining,
            "daysOverdue" => $daysOverdue,
            "dateClosed" => $dateClosed
        ])->setPaper("letter");

        $hospitalName = str_replace(" ", "-", $invoice->hospital->hospital_name);
        $invoiceNumber = $invoice->invoice_number;
        $dateNow = Carbon::now()->format("F j, Y");

        $filename = "{$hospitalName}-{$invoiceNumber}-{$dateNow}.pdf";

        return $pdf->stream($filename);
    }

    public function store(Request $request)
    {
        Gate::authorize("create", InvoiceHistory::class);

        $validated = $request->validate([
            "invoice_id" => "required|exists:invoices,id",
            "description" => "required|string",
            "status" => "required|string|in:open,overdue,closed"
        ]);

        if ($validated["description"] === "closed") {
            $validated["status"] = "closed";
            $description = 'Invoice has been closed';
        } else {
            $description = $validated["description"];
        }

        InvoiceHistory::create([
            "invoice_id" => $validated["invoice_id"],
            "updated_by" => Auth::id(),
            "status" => $validated["status"],
            "description" => $description
        ]);

        if ($validated["description"] === "closed") {
            Invoice::where("id", $validated["invoice_id"])->update([
                "date_closed" => now()
            ]);
        }

        return back()->with("success", true);   
    }
}
