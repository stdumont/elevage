<?php

namespace App\Controllers;

use App\Models\Race;

class RaceController extends Controller
{

    /**
     * Retourne toutes les races
     * @return json races
     */
    public function getAll()
    {
        $races = Race::orderBy('nom', 'asc')->get();
        return json_encode($races, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de races
     * @return json le nombre de races
     */
    public function getCount()
    {
        $nombre = Race::count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne une race sur base de son id
     * @return json race
     */
    public function find($request, $response, $args)
    {
        $id = $args['id'];
        $race = Race::find($id);
        return json_encode($race, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Insère une race
     */
    public function insert($request, $response, $args)
    {
        $race = Race::create([
            'nom' => $this->container->request->getParam('nom'),
        ]);
        return json_encode($race, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Met à jour une race
     */
    public function update($request, $response, $args)
    {
        $id = $this->container->request->getParam('id');
        $race = Race::find($id);
        $race->update([
            'nom' => $this->container->request->getParam('nom'),
        ]);
        return json_encode($race, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Supprime une race sur base de son id
     * @return json race
     */
    public function delete($request, $response, $args)
    {
        $id = $args['id'];
        Race::destroy($id);
        return json_encode("", JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
