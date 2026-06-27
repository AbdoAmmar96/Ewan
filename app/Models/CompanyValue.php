<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyValue extends Model
{
    protected $table = 'company_values';

    protected $guarded = [];

    protected $casts = ['active' => 'boolean'];
}
