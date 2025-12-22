<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation()
    {
        $this->merge([
            "hospital_id" => $this->route("hospital_id")
        ]);
    }

    public function rules(): array
    {
        return [
            "hospital_id" => "required|integer|exists:hospitals,id",
            "invoice_number" => "required|string|max:255|unique:invoices,invoice_number",
            "document_date" => "required|date",
            "due_date" => "required|date",
            "amount" => "required|numeric|min:0.01",
        ];
    }
}
    