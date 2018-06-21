<?php

namespace App\Controllers;

use App\Models\Agenda;

class AgendaController extends Controller
{

    /**
     * Retourne les événements compris entre start et end
     * @return json liste d'événements
     */
    public function retrieve()
    {
        $start = $this->container->request->getParam('start');
        $end = $this->container->request->getParam('end');
        var_dump('start=' . $start);
        var_dump('end=' . $end);
        die();
        $nombre = Agenda::count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de chiens pour une race
     * @return json le nombre de chiens
     */
    public function getCountByRace($request, $response, $args)
    {
        $race_id = $args['race_id'];
        $nombre = Agenda::where('race_id', $race_id)->count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
