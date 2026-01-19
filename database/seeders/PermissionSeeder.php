<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            [
                'name' => 'view_all_hospitals',
                'display_name' => 'View All Hospitals',
                'category' => 'hospitals',
            ],
            [
                'name' => 'view_area_hospitals',
                'display_name' => 'View Area Hospitals',
                'category' => 'hospitals',
            ],
            [
                'name' => 'manage_hospitals',
                'display_name' => 'Manage Hospitals',
                'category' => 'hospitals',
            ],
            [
                'name' => 'view_invoices',
                'display_name' => 'View Invoices',
                'category' => 'invoices',
            ],
            [
                'name' => 'manage_invoices',
                'display_name' => 'Manage Invoices',
                'category' => 'invoices',
            ],
            [
                'name' => 'view_invoice_history',
                'display_name' => 'View Invoice History',
                'category' => 'invoice_history',
            ],
            [
                'name' => 'create_invoice_history',
                'display_name' => 'Create Invoice History',
                'category' => 'invoice_history',
            ],
            [
                'name' => 'view_import_data',
                'display_name' => 'View Import Data Page',
                'category' => 'import_data',
            ],
            [
                'name' => 'import_data',
                'display_name' => 'Import Data',
                'category' => 'import_data',
            ],
            [
                'name' => 'view_users',
                'display_name' => 'View Users',
                'category' => 'users',
            ],
            [
                'name' => 'manage_users',
                'display_name' => 'Manage Users',
                'category' => 'users',
            ],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }
    }
}