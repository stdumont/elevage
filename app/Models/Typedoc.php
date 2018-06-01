<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Typedoc extends Model
{
    protected $table = 'typedocs';

    protected $fillable = [
        'nom',
        'rd'
    ];

    public function documents() {
        return $this->hasMany('App\Models\Document');
    }

}