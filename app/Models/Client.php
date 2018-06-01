<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table = 'clients';

    protected $fillable = [
        'nom',
        'rue',
        'numero',
        'cp',
        'localite',
        'tel',
        'email',
    ];

    public function documents() {
        return $this->hasMany('App\Models\Document');
    }

}