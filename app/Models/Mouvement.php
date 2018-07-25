<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Modèle des mouvements
 * @author Stéphane Dumont <dumont.stephane@gmail.com>
 * @package Models
 */
class Mouvement extends Model
{
    /**
     * nom de la table
     *
     * @var string
     */
    protected $table = 'mouvements';

    /**
     * tableau de champs modifiables
     *
     * @var array
     */
    protected $fillable = [
        'typeMvt',
        'motifMvt',
        'dateMvt',
        'chien_id',
    ];

}
