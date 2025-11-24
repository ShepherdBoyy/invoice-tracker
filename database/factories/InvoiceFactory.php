<?php

namespace Database\Factories;

use App\Models\Hospital;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{    
    public function definition(): array
    {
        $statuses = ["open", "overdue", "closed"];
        $status = $this->faker->randomElement($statuses);
        $documentDate = $this->faker->dateTimeBetween("-1 year", "now");
        $dueDate = Carbon::instance($documentDate)->addMonth();

        return [
            "hospital_id" => Hospital::factory(),
            "invoice_number" => "INV-" . $this->faker->unique()->numerify("######"),
            "document_date" => $documentDate,
            "due_date" => $dueDate,
            "amount" => $this->faker->randomFloat(2, 100, 50000),
            "description" => $this->faker->boolean(80) ? $this->faker->paragraph(3) : null,
            "status" => $status,
            "date_closed" => $status === "closed" ? $this->faker->dateTimeBetween($documentDate, "now") : null,
            "created_by" => User::factory(),
            'updated_by' => fake()->optional()->randomElement(User::pluck('id')->toArray()),
        ];
    }
}
