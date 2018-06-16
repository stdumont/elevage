<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Modèle des chiens
 * @author Stéphane Dumont <dumont.stephane@gmail.com>
 * @package Models
 */
class Chien extends Model
{
    /**
     * nom de la table
     *
     * @var string
     */
    protected $table = 'chiens';

    /**
     * tableau de champs modifiables
     *
     * @var array
     */
    protected $fillable = [
        'nom',
        'affixe',
        'sexe',
        'race_id',
        'robe_id',
        'date_naissance',
        'date_deces',
        'pere_id',
        'mere_id',
        'puce',
        'passeport',
        'client_id',
        'remarques',
    ];

/*     protected $with = ['localite'];

    public function localite() {
        return $this->belongsTo('App\Models\Localite');
    }
 */

}
