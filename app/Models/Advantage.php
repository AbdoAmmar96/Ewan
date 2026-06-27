<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Advantage extends Model
{
    protected $guarded = [];

    protected $casts = ['active' => 'boolean'];
}
