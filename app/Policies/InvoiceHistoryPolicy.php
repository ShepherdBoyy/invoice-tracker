<?php

namespace App\Policies;

use App\Models\User;

class InvoiceHistoryPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission("view_invoice_history");
    }

    public function create(User $user): bool
    {
        return $user->hasPermission("manage_invoice_history");
    }
}
