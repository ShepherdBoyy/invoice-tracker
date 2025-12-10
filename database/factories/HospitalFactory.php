<?php

namespace Database\Factories;

use App\Models\Area;
use App\Models\Hospital;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Hospital>
 */
class HospitalFactory extends Factory
{
    public function definition(): array
    {
        return [
            "hospital_name" => $this->faker->company(),
            'hospital_number' => 'HOS-' . $this->faker->unique()->randomNumber(5),
            "area_id" => Area::factory()
        ];
    }
}
