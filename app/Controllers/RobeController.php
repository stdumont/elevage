<?php

namespace App\Controllers;

use App\Models\Robe;

class RobeController extends Controller
{

    /**
     * Retourne toutes les robes
     * @return json robes
     */
    public function getAll()
    {
        $robes = Robe::orderBy('nom', 'asc')->get();
        $robesToSelect = array();
        foreach ($robes as $key => $robe){
            $robesToSelect[] = array('id' => $robe->id, 'text' => $robe->nom, 'race' => array('text' => $robe->race->nom));
        }
        return json_encode($robesToSelect, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de robes pour une race
     * @return json le nombre de robes
     */
    public function getCountByRace($request, $response, $args)
    {
        $race_id = $args['race_id'];
        $nombre = Robe::where('race_id', $race_id)->count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de robes
     * @return json le nombre de robes
     */
    public function getCount()
    {
        $nombre = Robe::count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne une robe sur base de son id
     * @return json robe
     */
    public function find($request, $response, $args)
    {
        $id = $args['id'];
        $robe = Robe::find($id);
        return json_encode($robe, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Insère une robe
     */
    public function insert($request, $response, $args)
    {
        $robe = Robe::create([
            'nom' => $this->container->request->getParam('nom'),
            'race_id' => $this->container->request->getParam('race_id'),
        ]);
        return json_encode($robe, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Met à jour une robe
     */
    public function update($request, $response, $args)
    {
        $id = $this->container->request->getParam('id');
        $robe = Robe::find($id);
        $robe->update([
            'nom' => $this->container->request->getParam('nom'),
            'race_id' => $this->container->request->getParam('race_id'),
        ]);
        return json_encode($robe, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Supprime une robe sur base de son id
     * @return json robe
     */
    public function delete($request, $response, $args)
    {
        $id = $args['id'];
        Robe::destroy($id);
        return json_encode("", JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
