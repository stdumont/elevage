<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Pays as pays;

/**
 * Modèle des localités
 * @author Stéphane Dumont <dumont.stephane@gmail.com>
 * @package Models
 */
class Localite extends Model
{
    /**
     * nom de la table
     *
     * @var string
     */
    protected $table = 'localites';

    /**
     * tableau de champs modifiables
     *
     * @var array
     */
    protected $fillable = [
        'code_postal',
        'nom',
        'pays_id'
    ];

    protected $with = ['pays'];

    /**
     * définit la relation inverse 1:N entre pays et localite
     *
     * @return void
     */
    public function pays() {
        return $this->belongsTo('App\Models\Pays');
    }

}