<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AreaFactory extends Factory
{
    public function definition(): array
    {
        $areas = [
            "NCR R and East",
            "M Bukidnon and CDO",
            "M Davao",
            "NCR Central",
            "NCR North",
            "NCR P",
            "NCR South",
            "NCR West",
            "V Bacolod and Iloilo",
            "V Cebu1",
            "V Cebu2",
            "NL Tuguegarao",
            "NL Pangasinan",
            "L Batangas",
            "L Bicol",
            "L Cavite",
            "L Laguna",
            "NL Baguio and NL La Union",
            "NL Bataan & Olongapo",
            "NL Bulacan",
            "NL Pampanga",
            "NL Pangasinan Tarlac",
            "M Butuan",
            "M Digos and Tagum",
            "M Gensan",
            "V Dumaguete",
            "V Ormoc",
        ];

        return [
            "area_name" => $this->faker->unique()->randomElement($areas),
        ];
    }

}
