<?php

namespace App\Http\Controllers;

use App\Exports\TemplateExport;
use App\Imports\DataImport;
use App\Imports\DataValidationImport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Validators\ValidationException;

use function PHPSTORM_META\map;

class ImportDataController extends Controller
{
    public function index()
    {
        Gate::authorize("viewImportData");

        return Inertia::render("ImportData/Index");
    }

    public function downloadTemplate()
    {
        Gate::authorize("viewImportData");

        return Excel::download(new TemplateExport, "Invoice_Tracker_Template.xlsx");
    }

    public function store(Request $request)
    {
        Gate::authorize("importData");

        $request->validate([
            "file" => "required|mimes:xlsx,xls,csv"
        ]);

        $file = $request->file("file");

        try {
            $validator = new DataValidationImport();
            Excel::import($validator, $file);

            if ($validator->failures()->isNotEmpty()) {
                $formattedErrors = $validator->failures()->map(function ($failure) {
                    return [
                        "row" => $failure->row(),
                        "header" => $failure->attribute(),
                        "errors" => $failure->errors(),
                    ];
                })->values()->toArray();
                
                return redirect()->back()->with([
                    "import_errors" => $formattedErrors
                ]);
            }

            Excel::import(new DataImport(), $file);
            return redirect()->back()->with("success", true);
        } catch (\Exception $e) {
            return redirect()->back()->with([
                "import_errors" => [[
                    "row" => "N/A",
                    "header" => "general",
                    "errors" => ["Import error: " . $e->getMessage()]
                ]]
            ]);
        }
    }
}
