<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Typedoc as typedoc;
use App\Models\Chien as chien;

class Document extends Model
{
    protected $table = 'documents';

    protected $fillable = [
        'typedoc_id',
        'chien_id',
        'nom',
        'description',
        'date_document'
    ];

    protected $with = ['typedoc', 'chien'];

    public function typedoc() {
        return $this->belongsTo('App\Models\Typedoc');
    }

    public function chien() {
        return $this->belongsTo('App\Models\Chien');
    }
}