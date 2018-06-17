<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
        'code_postal',
        'localite',
        'pays',
        'tel',
        'email',
        'tva',
    ];

}
