<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Modèle des pays
 * @author Stéphane Dumont <dumont.stephane@gmail.com>
 * @package Models
 */
class Pays extends Model
{
    /**
     * nom de la table
     *
     * @var string
     */
    protected $table = 'pays';

    /**
     * tableau de champs modifiables
     *
     * @var array
     */
    protected $fillable = [
        'nom'
    ];

    /**
     * définit la relation 1:N entre pays et localite
     *
     * @return void
     */
    public function localites() {
        return $this->hasMany('App\Models\Localite');
    }

}