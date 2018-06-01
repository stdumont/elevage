<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Piece as piece;

class Fichier extends Model
{
    protected $table = 'fichiers';

    protected $fillable = [
        'piece_id',
        'donnee',
    ];

    protected $with = ['piece'];

    public function piece() {
        return $this->belongsTo('App\Models\Piece');
    }


}