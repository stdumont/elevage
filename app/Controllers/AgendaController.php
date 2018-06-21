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
        $this->container['logger']->info('Agenda start : ' . $start);
        $this->container['logger']->info('Agenda end   : ' . $end);
        $evenements = Agenda::whereDate('start', '>=', "$start")
            ->where(function ($query) use ($end) {
                $query->whereDate('end', '<', "$end")
                      ->orWhereNull('end');
            })
            ->get();
        return json_encode($evenements, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
