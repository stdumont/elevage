<?php

namespace App\Controllers;

use App\Models\Document;

class DocumentController extends Controller
{

    /**
     * Retourne le nombre de documents pour un type de document donné
     * @return json nombre
     */
    public function getCountByTypedoc($request, $response, $args)
    {
        $id = $args['id'];
        $nombre = Document::
            where('typedoc_id', $id)
            ->count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
