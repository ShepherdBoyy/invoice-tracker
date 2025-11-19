<?php

use App\Http\Controllers\HospitalController;
use App\Http\Controllers\InvoiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/hospitals');

Route::get('/invoice_page', [InvoiceController::class, 'invoicePage']);
    
Route::prefix("hospitals")->group(function () {
    Route::get("/", [HospitalController::class, "index"]);
    Route::post("/create", [HospitalController::class, "store"]);
    Route::get("/invoices/{hospital_id}/{processing_days}/{invoices_count}", [HospitalController::class, "show"]);
    Route::put("/edit/{id}", [HospitalController::class, "update"]);
    Route::delete("/delete/{id}", [HospitalController::class, "destroy"]);
});

Route::prefix("invoices")->group(function () {
    Route::get("/{processing_days}", [InvoiceController::class, "index"]);
});

