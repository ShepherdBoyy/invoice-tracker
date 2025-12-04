<?php

namespace App\Http\Controllers;

use App\Exports\TemplateExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ImportDataController extends Controller
{
    public function index()
    {
        return Inertia::render("ImportData/Index");
    }

    public function downloadTemplate()
    {
        return Excel::download(new TemplateExport, "Invoice_Tracker_Template.xlsx");
    }

    public function store(Request $request)
    {
        dd($request->all());
    }
}
