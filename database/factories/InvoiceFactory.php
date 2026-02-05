<?php

namespace Database\Factories;

use App\Models\Hospital;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class InvoiceFactory extends Factory
{
    public function definition(): array
    {
        $documentDate = $this->faker->dateTimeBetween("-1 year", "now");
        $dueDate = Carbon::instance($documentDate)->addMonth();

        $isClosed = $this->faker->boolean(30);
        $dateClosed = $isClosed
            ? $this->faker->dateTimeBetween($documentDate, "now")
            : null;

        $today = Carbon::today();
        $dueCarbon = Carbon::instance($dueDate)->startOfDay();

        if (!empty($dateClosed)) {
            $status = "closed";
        } else {
            $status = $today->greaterThan($dueCarbon)
                ? "overdue"
                : "open";
        }

        return [
            "hospital_id"   => Hospital::factory(),
            "invoice_number" => "INV-" . $this->faker->unique()->numerify("######"),
            "document_date" => $documentDate,
            "due_date"      => $dueDate,
            "amount"        => $this->faker->randomFloat(2, 100, 50000),
            "status"        => $status,
            "date_closed"   => $dateClosed,
            "created_by"    => null
        ];
    }
}
