<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class DataValidationImport implements ToCollection, WithHeadingRow, WithValidation, SkipsOnFailure
{
    use SkipsFailures;

    public function collection(Collection $rows)
    {

    }

    public function rules(): array
    {
        return [
            "*.area" => ["required", "string"],
            "*.customer_no" => ["required", "string", "unique:hospitals,hospital_number"],
            "*.customer_name" => ["required", "string"],
            "*.invoice_no" => ["required", "string", "unique:invoices,invoice_number"],
            "*.document_date" => ["required", "date"],
            "*.due_date" => ["required", "date"],
            "*.amount" => ["required", "numeric", "min:0.01"],
        ];
    }
}
