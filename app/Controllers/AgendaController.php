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
        // $this->container['logger']->info('Agenda start : ' . $start);
        // $this->container['logger']->info('Agenda end   : ' . $end);
        $evenements = Agenda::where('start', '>=', "$start")
            ->where(function ($query) use ($end) {
                $query->where('end', '<', "$end")
                    ->orWhereNull('end');
            })
            ->get();
        return json_encode($evenements, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Insère un événement dans l'agenda
     */
    public function insert($request, $response, $args)
    {
        $evenement = Agenda::create([
            'title' => $this->container->request->getParam('title'),
            'description' => $this->container->request->getParam('description'),
            'allDay' => $this->container->request->getParam('allDay'),
            'start' => $this->container->request->getParam('start'),
            'end' => $this->container->request->getParam('end'),
            'generated' => $this->container->request->getParam('generated'),
            'editable' => $this->container->request->getParam('editable'),
            'color' => $this->container->request->getParam('color'),
        ]);
        return json_encode($evenement, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Met à jour un événement dans l'agenda
     */
    public function update($request, $response, $args)
    {
        $id = $this->container->request->getParam('id');
        $evenement = Agenda::find($id);
        $evenement->update([
            'title' => $this->container->request->getParam('title'),
            'description' => $this->container->request->getParam('description'),
            'allDay' => $this->container->request->getParam('allDay'),
            'start' => $this->container->request->getParam('start'),
            'end' => $this->container->request->getParam('end'),
            'generated' => $this->container->request->getParam('generated'),
            'editable' => $this->container->request->getParam('editable'),
            'color' => $this->container->request->getParam('color'),
        ]);
        return json_encode($evenement, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Supprime un evenement sur base de son id
     * @return json evenement
     */
    public function delete($request, $response, $args)
    {
        $id = $args['id'];
        Agenda::destroy($id);
        return json_encode("", JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
