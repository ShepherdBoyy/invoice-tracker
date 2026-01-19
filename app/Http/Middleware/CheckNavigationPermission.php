<?php

namespace App\Http\Middleware;

use App\Policies\NavigationPolicy;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckNavigationPermission
{
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        $user = $request->user();
        $policy = new NavigationPolicy();

        $canAccess = match ($permission) {
            "hospitals" => $policy->viewHospitals($user),
            "import-data" => $policy->viewImportData($user),
            "user-management" => $policy->viewUserManagement($user),
            default => false
        };

        if (!$canAccess) {
            abort(403, "Unauthorized access");
        }

        return $next($request);
    }
}
