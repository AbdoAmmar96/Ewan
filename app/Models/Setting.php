<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $primaryKey = 'key';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $guarded = [];

    protected $casts = ['value' => 'array'];

    public static function get(string $key, $default = null)
    {
        $row = static::find($key);

        return $row ? $row->value : $default;
    }

    public static function put(string $key, $value): self
    {
        return static::updateOrCreate(['key' => $key], ['value' => $value]);
    }

    /** All settings as a flat key => value map. */
    public static function map(): array
    {
        return static::all()->pluck('value', 'key')->all();
    }
}
