<?php

use App\Http\Controllers\HospitalController;
use App\Http\Controllers\InvoiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/hospitals');

Route::prefix("hospitals")->group(function () {
    Route::get("/", [HospitalController::class, "index"]);
});

Route::prefix("invoices")->group(function () {
    Route::get("/", [InvoiceController::class, "index"]);
});