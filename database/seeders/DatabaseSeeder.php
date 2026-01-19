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
        $areas = Area::factory()->count(13)->create();

        $roles = [
            ['username' => 'admin', 'name' => 'Admin User', 'role' => 'admin'],
            ['username' => 'purchasing', 'name' => 'Purchasing User', 'role' => 'purchasing'],
            ['username' => 'collector', 'name' => 'Collector User', 'role' => 'collector'],
            ['username' => 'agent', 'name' => 'Agent User', 'role' => 'agent'],
            ['username' => 'accounting', 'name' => 'Accounting User', 'role' => 'accounting'],
            ['username' => 'user1', 'name' => 'User 1', 'role' => 'staff'],
            ['username' => 'user2', 'name' => 'User 2', 'role' => 'staff'],
            ['username' => 'user3', 'name' => 'User 3', 'role' => 'staff'],
            ['username' => 'user4', 'name' => 'User 4', 'role' => 'staff'],
            ['username' => 'user5', 'name' => 'User 5', 'role' => 'staff'],
        ];

        $users = [];

        foreach ($roles as $index => $userData) {
            $users[] = User::firstOrCreate(
                ['username' => $userData['username']],
                [
                    'name' => $userData['name'],
                    'role' => $userData['role'],
                    'password' => Hash::make('password'),
                    'visible_password' => Crypt::encryptString('password'),
                    'area_id' => $areas[$index]->id,
                ]
            );
        }

        foreach ($areas as $area) {
            $hospitals = Hospital::factory()
                ->count(30)
                ->has(
                    Invoice::factory()
                        ->count(15)
                        ->state(fn() => ['created_by' => collect($users)->random()->id])
                )
                ->create([
                    'area_id' => $area->id,
                ]);
        }

        Invoice::all()->each(function ($invoice) use ($users) {
            InvoiceHistory::factory()->create([
                'invoice_id' => $invoice->id,
                'updated_by' => collect($users)->random()->id,
            ]);
        });

        // $areas = Area::factory()->count(13)->create();

        // $roles = [
        //     ['username' => 'admin', 'name' => 'Admin User', 'role' => 'admin'],
        //     ['username' => 'purchasing', 'name' => 'Purchasing User', 'role' => 'purchasing'],
        //     ['username' => 'collector', 'name' => 'Collector User', 'role' => 'collector'],
        //     ['username' => 'accounting', 'name' => 'Accounting User', 'role' => 'accounting'],
        //     ['username' => 'agent', 'name' => 'Agent User', 'role' => 'agent'],
        //     ['username' => 'user1', 'name' => 'User 1', 'role' => 'agent'],
        //     ['username' => 'user2', 'name' => 'User 2', 'role' => 'agent'],
        //     ['username' => 'user3', 'name' => 'User 3', 'role' => 'agent'],
        //     ['username' => 'user4', 'name' => 'User 4', 'role' => 'agent'],
        //     ['username' => 'user5', 'name' => 'User 5', 'role' => 'agent'],
        //     ['username' => 'user6', 'name' => 'User 6', 'role' => 'agent'],
        //     ['username' => 'user7', 'name' => 'User 7', 'role' => 'agent'],
        // ];

        // foreach ($roles as $index => $userData) {
        //     User::firstOrCreate(
        //         ['username' => $userData['username']],
        //         [
        //             'name' => $userData['name'],
        //             'role' => $userData['role'],
        //             'password' => Hash::make('password'),
        //             'visible_password' => Crypt::encryptString('password'),
        //             'area_id' => $areas[$index % $areas->count()]->id,
        //         ]
        //     );
        // }
    }

}
