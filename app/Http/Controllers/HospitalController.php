<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHospitalRequest;
use App\Http\Requests\UpdateHospitalRequest;
use App\Models\Hospital;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HospitalController extends Controller
{
    public function index()
    {
        $hospitals = Hospital::withCount("invoices")
            ->orderBy("created_at", "desc")
            ->paginate(10);

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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    public function update(UpdateHospitalRequest $request, string $id)
    {
        $hospital = Hospital::findOrFail($id);

        if ($request->input("hospital_name") === $hospital->hospital_name) {
            return back()->withErrors(["hospital_name" => "Update requires a different value"]);
        }

        $validated = $request->validated();

        $hospital->update($validated);

        return back()->with("success", true);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
