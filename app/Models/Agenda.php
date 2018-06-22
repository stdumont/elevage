<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Modèle de l'agenda
 * @author Stéphane Dumont <dumont.stephane@gmail.com>
 * @package Models
 */
class Agenda extends Model
{
    /**
     * nom de la table
     *
     * @var string
     */
    protected $table = 'agenda';

    /**
     * tableau de champs modifiables
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'allDay',
        'start',
        'end',
        'generated',
        'editable',
        'color',
    ];

    protected $casts = [
        'allDay' => 'boolean',
        'generated' => 'boolean',
        'editable' => 'boolean',
    ];

}
