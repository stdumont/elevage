<?php

namespace App\Controllers;

use App\Models\Chien;

class ChienController extends Controller
{

    /**
     * Retourne le nombre de chiens
     * @return json le nombre de chiens
     */
    public function getCount()
    {
        $nombre = Chien::count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de chiens pour une race
     * @return json le nombre de chiens
     */
    public function getCountByRace($request, $response, $args)
    {
        $race_id = $args['race_id'];
        $nombre = Chien::where('race_id', $race_id)->count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
