<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Hospital;
use App\Models\Invoice;
use App\Models\InvoiceHistory;
use App\Models\User;
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
        $filterUser = $request->query("selected_user");
        $perPage = $request->query("per_page", 10);
        $sortBy = $request->query("sort_by", "updated_at");
        $sortOrder = $request->query("sort_order", "desc");

        $userAreas = Gate::allows("viewAll", Hospital::class) ? Area::all() : $user->areas;

        $users = User::query()
            ->when(!Gate::allows("viewAll", Hospital::class), function ($query) use ($user) {
                $userAreaIds = $user->areas->pluck("id");
                $query->whereHas("areas", function ($q) use ($userAreaIds) {
                    $q->whereIn("areas.id", $userAreaIds);
                });
            })
            ->orderBy("name")
            ->get(["id", "name"]);
        
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
            ->when($searchQuery, function ($query) use ($searchQuery) {
                $query->whereHas("invoice", function ($q) use($searchQuery) {
                    $q->where("invoice_number", "like", "%{$searchQuery}%");
                })
                ->orWhereHas("invoice.hospital", function ($q) use ($searchQuery) {
                    $q->where("hospital_name", "like", "%{$searchQuery}%");
                });
            })
            ->whereHas("invoice.hospital", function ($query) use ($user, $filterArea) {
                if (!Gate::allows("viewAll", Hospital::class)) {
                    $userAreaIds = $user->areas->pluck("id");
                    $query->whereIn("area_id", $userAreaIds);
                }

                if ($filterArea) {
                    $query->where("area_id", $filterArea);
                }
            })
            ->whereHas("invoice", function ($query) use ($filterStatus) {
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
            ->when($filterUser, function ($query) use ($filterUser) {
                $query->where("updated_by", $filterUser);
            })
            ->when($sortBy, function ($query) use ($sortBy, $sortOrder) {
                switch ($sortBy) {
                    case "hospital_name":
                        $query->orderBy(
                            Hospital::select("hospital_name")
                                ->join("invoices", "hospitals.id", "=", "invoices.hospital_id")
                                ->whereColumn("invoices.id", "invoice_histories.invoice_id")
                                ->limit(1),
                            $sortOrder
                        );
                        break;
                    
                    case "invoice_number":
                        $query->orderBy(
                            Invoice::select("invoice_number")
                                ->whereColumn("invoices.id", "invoice_histories.invoice_id")
                                ->limit(1),
                            $sortOrder
                        );
                        break;
                    
                    case "processing_days":
                        $query->orderByRaw("
                            (
                                SELECT CASE
                                    WHEN date_closed IS NOT NULL
                                        THEN DATEDIFF(due_date, date_closed)
                                    ELSE
                                        DATEDIFF(due_date, CURDATE())
                                END
                                FROM invoices
                                WHERE invoices.id = invoice_histories.invoice_id
                                LIMIT 1     
                            ) $sortOrder
                        ");
                        break;
                    
                    case "updated_by":
                        $query->orderBy(
                            User::select("name")
                                ->whereColumn("id", "invoice_histories.updated_by")
                                ->limit(1),
                            $sortOrder
                        );
                        break;

                    default:
                        $query->orderBy("invoice_histories.updated_at", $sortOrder);
                }
            })
            ->paginate($perPage)
            ->withQueryString();
        
        return Inertia::render("Home/Index", [
            "latestUpdates" => $latestUpdates,
            "userAreas" => $userAreas,
            "users" => $users,
            "filters" => [
                "search" => $searchQuery,
                "date_range" => $dateRange,
                "custom_date_from" => $customDateFrom,
                "custom_date_to" => $customDateTo,
                "area" => $filterArea,
                "status" => $filterStatus,
                "sort_order" => $sortOrder,
                "sort_by" => $sortBy,
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
