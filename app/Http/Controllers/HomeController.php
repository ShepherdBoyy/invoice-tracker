<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Hospital;
use App\Models\InvoiceHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $searchQuery = $request->query("search");
        $dateRange = $request->query("date_range");
        $customDateFrom = $request->query("custom_date_from");
        $customDateTo = $request->query("custom_date_to");
        $filterArea = $request->query("selected_area");
        $filterStatus = $request->query("selected_status");
        $perPage = $request->query("per_page", 10);

        $userAreas = Gate::allows("viewAll", Hospital::class) ? Area::all() : $user->areas;

        $latestUpdates = InvoiceHistory::query()
            ->with([
                "invoice" => function ($query) {
                    $query->select("invoices.*")
                        ->addSelect([
                            "processing_days" => function ($subQuery) {
                                $subQuery->selectRaw("
                                    CASE
                                        WHEN date_closed IS NOT NULL
                                            THEN DATEDIFF(due_date, date_closed)
                                        ELSE
                                            DATEDIFF(due_date, CURDATE())
                                    END
                                ");
                            }
                        ]);
                },
                "invoice.hospital.area",
                "updater"
            ])
            ->whereHas("invoice.hospital", function ($query) use ($user, $searchQuery, $filterArea) {
                if (!Gate::allows("viewAll", Hospital::class)) {
                    $userAreaIds = $user->areas->pluck("id");
                    $query->whereIn("area_id", $userAreaIds);
                }

                if ($searchQuery) {
                    $query->where("hospital_name", "like", "%{$searchQuery}%");
                }

                if ($filterArea) {
                    $query->where("area_id", $filterArea);
                }
            })
            ->whereHas("invoice", function ($query) use ($searchQuery, $filterStatus) {
                if ($searchQuery) {
                    $query->where("invoice_number", "like", "%{$searchQuery}%");
                }

                if ($filterStatus) {
                    $query->where("status", $filterStatus);
                }
            })
            ->when($dateRange === "today", function ($query) {
                $query->whereDate("invoice_histories.created_at", today());
            })
            ->when($dateRange === "7days", function ($query) {
                $query->whereDate("invoice_histories.created_at", ">=", now()->subDays(7));
            })
            ->when($dateRange === "30days", function ($query) {
                $query->whereDate("invoice_histories.created_at", ">=", now()->subDays(30));
            })
            ->when($dateRange === "custom" && $customDateFrom && $customDateTo, function ($query) use ($customDateFrom, $customDateTo) {
                $query->whereBetween("invoice_histories.created_at", [$customDateFrom, $customDateTo]);
            })
            ->orderBy("updated_at", "desc")
            ->paginate($perPage)
            ->withQueryString();
        
        return Inertia::render("Home/Index", [
            "latestUpdates" => $latestUpdates,
            "userAreas" => $userAreas,
            "filters" => [
                "search" => $searchQuery,
                "date_range" => $dateRange,
                "custom_date_from" => $customDateFrom,
                "custom_date_to" => $customDateTo,
                "area" => $filterArea,
                "status" => $filterStatus,
            ]
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
