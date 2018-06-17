<?php

namespace App\Controllers;

use App\Models\Elevage;

class ElevageController extends Controller
{

    /**
     * Retourne le premier (et seul) élevage
     * @return json elevage
     */
    public function first($request, $response, $args)
    {
        $elevage = Elevage::first();
        return json_encode($elevage, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Met à jour un elevage
     */
    public function update($request, $response, $args)
    {
        $id = $this->container->request->getParam('id');
        $elevage = Elevage::find($id);
        $elevage->update([
            'nom' => $this->container->request->getParam('nom'),
            'affixe' => $this->container->request->getParam('affixe'),
            'responsable' => $this->container->request->getParam('responsable'),
            'rue' => $this->container->request->getParam('rue'),
            'numero' => $this->container->request->getParam('numero'),
            'code_postal' => $this->container->request->getParam('code_postal'),
            'localite' => $this->container->request->getParam('localite'),
            'pays' => $this->container->request->getParam('pays'),
            'tel' => $this->container->request->getParam('tel'),
            'email' => $this->container->request->getParam('email'),
            'tva' => $this->container->request->getParam('tva'),
        ]);
        return json_encode($elevage, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
