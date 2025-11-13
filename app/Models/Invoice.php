<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'customer_name_id',
        'invoice_number',
        'amount',
        'status',
        'transaction_date',
        'date_closed',
        'processing_days',
        'created_by'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_name_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'invoice_id');
    }

    public function details()
    {
        return $this->hasMany(InvoiceDetail::class);
    }
}
