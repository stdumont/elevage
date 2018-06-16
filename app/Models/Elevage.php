<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Localite as localite;

/**
 * Modèle des élevages
 * @author Stéphane Dumont <dumont.stephane@gmail.com>
 * @package Models
 */
class Elevage extends Model
{
    /**
     * nom de la table
     *
     * @var string
     */
    protected $table = 'elevages';

    /**
     * tableau de champs modifiables
     *
     * @var array
     */
    protected $fillable = [
        'nom',
        'affixe',
        'responsable',
        'rue',
        'numero',
        'localite_id',
        'tel',
        'email',
        'tva',
    ];

    protected $with = ['localite'];

    public function localite() {
        return $this->belongsTo('App\Models\Localite');
    }


}
