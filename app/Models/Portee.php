<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Modèle des portées
 * @author Stéphane Dumont <dumont.stephane@gmail.com>
 * @package Models
 */
class Portee extends Model
{
    /**
     * nom de la table
     *
     * @var string
     */
    protected $table = 'portees';

    /**
     * tableau de champs modifiables
     *
     * @var array
     */
    protected $fillable = [
        'numero',
        'pere_id',
        'mere_id',
        'race_id',
        'date_saillie_1',
        'date_saillie_2',
        'date_naissance',
        'nbr_chiots_viv',
        'nbr_males_viv',
        'nbr_femelles_viv',
        'nbr_chiots_dcd',
        'nbr_males_dcd',
        'nbr_femelles_dcd',
        'remarques',
    ];

    protected $with = ['race', 'pere', 'mere', 'chiots'];

    public function race()
    {
        return $this->belongsTo('App\Models\Race');
    }

    public function pere()
    {
        return $this->belongsTo('App\Models\Chien');
    }

    public function mere()
    {
        return $this->belongsTo('App\Models\Chien');
    }

    public function chiots()
    {
        return $this->hasMany('App\Models\Chiot');
    }

}
