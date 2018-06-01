<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Typedoc as typedoc;
use App\Models\Client as client;
use App\Models\Fournisseur as fournisseur;

class Document extends Model
{
    protected $table = 'documents';

    protected $fillable = [
        'typedoc_id',
        'client_id',
        'fournisseur_id',
        'nom',
        'description',
        'rd',
        'communication',
        'montant_htva',
        'montant_tva',
        'montant_tvac',
        'regle',
        'solde',
        'date_document',
        'date_echeance',
    ];

    protected $with = ['typedoc', 'client', 'fournisseur', 'pieces'];

    public function typedoc() {
        return $this->belongsTo('App\Models\Typedoc');
    }

    public function client() {
        return $this->belongsTo('App\Models\Client');
    }

    public function fournisseur() {
        return $this->belongsTo('App\Models\Fournisseur');
    }

    public function pieces() {
        return $this->hasMany('App\Models\Piece');
    }
}