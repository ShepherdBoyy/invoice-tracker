<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImportHistory extends Model
{
    protected $fillable = [
        "file_name",
        "total_rows",
        "imported_by"
    ];

    public function importer()
    {
        return  $this->belongsTo(User::class, "imported_by");
    }
}
