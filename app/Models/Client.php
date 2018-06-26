<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Modèle des clients
 * @author Stéphane Dumont <dumont.stephane@gmail.com>
 * @package Models
 */
class Client extends Model
{
    /**
     * nom de la table
     *
     * @var string
     */
    protected $table = 'clients';

    /**
     * tableau de champs modifiables
     *
     * @var array
     */
    protected $fillable = [
        'nom',
        'prenom',
        'rue',
        'numero',
        'code_postal',
        'localite',
        'pays',
        'tel1',
        'tel2',
        'email',
        'remarques',
    ];

    protected $with = ['chiens'];

    
    /**
     * définit la relation 1:N entre client et chien
     *
     * @return void
     */
    public function chiens() {
        return $this->hasMany('App\Models\Chien');
    }

}
