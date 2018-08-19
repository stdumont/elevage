<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Modèle des chiots
 * @author Stéphane Dumont <dumont.stephane@gmail.com>
 * @package Models
 */
class Chiot extends Model
{
    /**
     * nom de la table
     *
     * @var string
     */
    protected $table = 'chiots';

    /**
     * tableau de champs modifiables
     *
     * @var array
     */
    protected $fillable = [
        'portee_id',
        'nom',
        'sexe',
        'robe_id',
        'chien_id',
        'date_sortie',
        'remarques',
    ];

     protected $with = ['portee', 'robe', 'chien'];

    public function portee() {
        return $this->belongsTo('App\Models\Portee');
    }

    public function robe() {
        return $this->belongsTo('App\Models\Robe');
    }

    public function chien() {
        return $this->belongsTo('App\Models\Chien');
    }


}
