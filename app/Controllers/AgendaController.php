<?php

namespace App\Controllers;

use App\Models\Agenda;
use App\Models\Chien;

class AgendaController extends Controller
{

    /**
     * Retourne le nombre d'événements de l'agenda
     * @return json le nombre d'événements
     */
    public function getCount()
    {
        $nombre = Agenda::count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

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
        try {
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
        } catch (\Illuminate\Database\QueryException $ex) {
            $this->container['logger']->info('AgendaController.insertException : ' . $ex->getMessage());
            // Note any method of class PDOException can be called on $ex.
        }
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
     * Génère les événements d'anniversaire des chiens
     */
    public function generate($request, $response, $args)
    {
        $datePlafond = date("Y-m-d", strtotime("-1 year"));
        $dateY = date("Y");
        $deletedRows = Agenda::where('generated', 1)->delete();
        $chiens = Chien::
            whereNotNull('date_naissance')
            ->where('date_naissance', '<=', $datePlafond)
            ->whereNull('date_deces')
            ->where('present', '=', 1)
            ->get();
            $i = 0;
        foreach ($chiens as $chien) {
            $dn = date_parse($chien->date_naissance);
            $delta = $dateY - $dn['year'];
            $agenda = new Agenda;
            $agenda->title = $chien->nom . ' - ' . $delta . ' ' . ($delta < 2 ? 'an' : 'ans');
            $agenda->allDay = 1;
            $agenda->start = $dateY . '-' . ($dn['month'] < 10 ? '0' : '') . $dn['month'] . '-' . ($dn['day'] < 10 ? '0' : '') . $dn['day'];
            $agenda->generated = 1;
            $agenda->save();
            $i++;
        }
        $message = $i . ' événement(s) automatique(s) généré(s).';
        return json_encode($message, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
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
