<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Piece extends Model
{
    protected $table = 'pieces';

    protected $fillable = [
        'document_id',
        'nom',
        'type',
        'taille',
    ];

    /**
     * Renvoi du fichier de données associé (1:1) à la pièce
     * 
     * Usage : $fichier = Piece::find(1)->fichier;
     * 
     * @see : https://laravel.com/docs/master/eloquent-relationships#one-to-one
     *
     * @return void
     */
    public function fichier(){
        return $this->hasOne('App\Models\Fichier');
    }

}