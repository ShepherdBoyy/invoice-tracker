<?php

namespace Database\Seeders;

use App\Models\Area;
use App\Models\Hospital;
use App\Models\Invoice;
use App\Models\InvoiceHistory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $areas = Area::factory()->count(10)->create();

        $roles = [
            ['username' => 'admin', 'name' => 'Admin User', 'role' => 'admin'],
            ['username' => 'purchasing', 'name' => 'Purchasing User', 'role' => 'purchasing'],
            ['username' => 'collector', 'name' => 'Collector User', 'role' => 'collector'],
            ['username' => 'agent', 'name' => 'Agent User', 'role' => 'agent'],
            ['username' => 'accounting', 'name' => 'Accounting User', 'role' => 'accounting'],
        ];

        foreach ($roles as $userData) {
            User::firstOrCreate(
                ['username' => $userData['username']],
                [
                    'name' => $userData['name'],
                    'role' => $userData['role'],
                    'password' => Hash::make('password'),
                    'area_id' => $areas->random()->id,
                    'visible_password' => Crypt::encryptString('password'),
                ]
            );
        }

        Hospital::factory()
            ->count(50)
            ->has(Invoice::factory()->count(15))
            ->create([
                'area_id' => $areas->random()->id,
            ]);

        $users = User::pluck('id')->toArray();

        Invoice::all()->each(function ($invoice) use ($users) {
            InvoiceHistory::factory()
                ->count(rand(1, 5))
                ->create([
                    'invoice_id' => $invoice->id,
                    'updated_by' => collect($users)->random(),
                ]);
        });
    }
}
