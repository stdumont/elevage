<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Document;

/**
 * Modèle des types de documents
 * @author Stéphane Dumont <dumont.stephane@gmail.com>
 * @package Models
 */
class Typedoc extends Model
{
    /**
     * nom de la table
     *
     * @var string
     */
    protected $table = 'typedocs';

    /**
     * tableau de champs modifiables
     *
     * @var array
     */
    protected $fillable = [
        'nom'
    ];

    /**
     * définit la relation 1:N entre type de document et document
     *
     * @return void
     */
    public function documents() {
        return $this->hasMany('App\Models\Document');
    }

}