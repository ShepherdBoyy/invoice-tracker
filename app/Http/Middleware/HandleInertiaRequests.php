<?php

namespace App\Http\Middleware;

use App\Policies\NavigationPolicy;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();
        $navigationPolicy = new NavigationPolicy();

        return array_merge(parent::share($request), [
            "auth" => [
                "user" => $request->user()
            ],
            "permissions" => $user ? [
                "canViewHospitals" => $navigationPolicy->viewHospitals($user),
                "canViewImportData" => $navigationPolicy->viewImportData($user),
                "canViewUserManagement" => $navigationPolicy->viewUserManagement($user)
            ] : null
        ]);
    }
}
