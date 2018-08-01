<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Document as document;

class Fichier extends Model
{
    protected $table = 'fichiers';

    protected $fillable = [
        'document_id',
        'nomFichier',
        'contentType',
        'taille',
        'donnee'
    ];

    protected $with = ['document'];

    public function document() {
        return $this->belongsTo('App\Models\Document');
    }


}