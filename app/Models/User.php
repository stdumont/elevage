<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Modèle utilisateur
 * @author Stéphane Dumont <dumont.stephane@gmail.com>
 * @package Models
 */
class User extends Model
{
    /**
     * nom de la table
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * tableau de champs modifiables
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password'
    ];

}