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
        'tatouage',
        'client_id',
        'portee_id',
        'chiot_id',
        'present',
        'produit',
        'remarques',
    ];

     protected $with = ['race', 'robe', 'pere', 'mere', 'portee', 'chiot'];
     
    protected $casts = [
        'present' => 'boolean',
        'produit' => 'boolean',
    ];

    public function race() {
        return $this->belongsTo('App\Models\Race');
    }

    public function robe() {
        return $this->belongsTo('App\Models\Robe');
    }

    public function pere() {
        return $this->belongsTo('App\Models\Chien');
    }

    public function mere() {
        return $this->belongsTo('App\Models\Chien');
    }

    public function client() {
        return $this->belongsTo('App\Models\Client');
    }

    public function portee() {
        return $this->belongsTo('App\Models\Portee');
    }

    public function chiot() {
        return $this->belongsTo('App\Models\Chiot');
    }


}
