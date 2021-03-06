<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Modèle des paramètres
 * @author Stéphane Dumont <dumont.stephane@gmail.com>
 * @package Models
 */
class Parameter extends Model
{
    /**
     * nom de la table
     *
     * @var string
     */
    protected $table = 'parameters';

    /**
     * tableau de champs modifiables
     *
     * @var array
     */
    protected $fillable = [
        'nom',
        'valeur'
    ];

}