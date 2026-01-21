<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "name" => ["required", "string", "max:50",],
            'username' => ["required", "string", "max:30", "regex:/^[A-za-z0-9.]+$/"],
            "password" => ["required", "string", "min:8"],
            "permissions" => ["required", "array", "min:1"],
            "permissions.*" => ["integer", "exists:permissions,id"],
            "areas" => ["nullable", "array"],
            "areas.*" => ["integer", "exists:areas,id"]
        ];
    }

    public function messages(): array
    {
        return [
            "permissions.required" => "Please select at least one permissions",
            "permissions.min" => "Please select at least one permissions",
            "areas.*.exists" => "Selected area is invalid",
        ];
    }
}
