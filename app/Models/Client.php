<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Localite as localite;

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
        'localite_id',
        'tel',
        'email',
        'remarques',
    ];

    protected $with = ['localite'];

    public function localite() {
        return $this->belongsTo('App\Models\Localite');
    }


}
