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
                'display_name' => 'View All Areas',
                'category' => 'hospitals',
            ],
            [
                'name' => 'view_area_hospitals',
                'display_name' => 'View Specific Area',
                'category' => 'hospitals',
            ],
            [
                'name' => 'manage_hospitals',
                'display_name' => 'Manage',
                'category' => 'hospitals',
            ],
            [
                'name' => 'view_invoices',
                'display_name' => 'View',
                'category' => 'invoices',
            ],
            [
                'name' => 'manage_invoices',
                'display_name' => 'Manage',
                'category' => 'invoices',
            ],
            [
                'name' => 'view_invoice_history',
                'display_name' => 'View',
                'category' => 'invoice_history',
            ],
            [
                'name' => 'manage_invoice_history',
                'display_name' => 'Manage',
                'category' => 'invoice_history',
            ],
            [
                'name' => 'view_import_data',
                'display_name' => 'View',
                'category' => 'import_data',
            ],
            [
                'name' => 'manage_import_data',
                'display_name' => 'Manage',
                'category' => 'import_data',
            ],
            [
                'name' => 'view_users',
                'display_name' => 'View',
                'category' => 'users',
            ],
            [
                'name' => 'manage_users',
                'display_name' => 'Manage',
                'category' => 'users',
            ],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }
    }
}