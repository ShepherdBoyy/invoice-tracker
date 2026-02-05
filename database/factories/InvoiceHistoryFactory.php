<?php

namespace Database\Factories;

use App\Models\Invoice;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceHistoryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'invoice_id' => null,
            'updated_by' => null,
            'description' => $this->faker->sentence(),
        ];
    }
}