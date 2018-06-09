<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Modèle des races
 * @author Stéphane Dumont <dumont.stephane@gmail.com>
 * @package Models
 */
class Race extends Model
{
    /**
     * nom de la table
     *
     * @var string
     */
    protected $table = 'races';

    /**
     * tableau de champs modifiables
     *
     * @var array
     */
    protected $fillable = [
        'nom'
    ];

    /**
     * définit la relation 1:N entre race et robe
     *
     * @return void
     */
    public function robes() {
        return $this->hasMany('App\Models\Robe');
    }

}