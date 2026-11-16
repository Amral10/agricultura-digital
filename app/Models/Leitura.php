<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Leitura extends Model
{
    protected $fillable = [
        'sensor',
        'tipo',
        'valor',
    ];
    //
}
