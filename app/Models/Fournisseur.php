<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model
{
    protected $table = 'fournisseurs';

    protected $fillable = [
        'nom',
        'rue',
        'numero',
        'cp',
        'localite',
        'tel',
        'email',
        'tva',
        'banque',
    ];

    public function documents() {
        return $this->hasMany('App\Models\Document');
    }

}