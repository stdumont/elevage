<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Race;

/**
 * Modèle des robes
 * @author Stéphane Dumont <dumont.stephane@gmail.com>
 * @package Models
 */
class Robe extends Model
{
    /**
     * nom de la table
     *
     * @var string
     */
    protected $table = 'robes';

    /**
     * tableau de champs modifiables
     *
     * @var array
     */
    protected $fillable = [
        'race_id',
        'nom'
    ];

    // Renvoyer la race
    protected $with = ['race'];

    /**
     * définit la relation inverse 1:N entre race et robe
     *
     * @return void
     */
    public function race() {
        return $this->belongsTo('App\Models\Race');
    }

}