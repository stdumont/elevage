<?php

namespace App\Controllers;

use App\Models\Localite;

class LocaliteController extends Controller
{
    /**
     * Retourne le nombre de localites
     * @return json le nombre de localites
     */
    public function getCount()
    {
        $nombre = Localite::count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de localités d'un pays
     * @return json le nombre de localités
     */
    public function getCountByPays($request, $response, $args)
    {
        $id = $args['id'];
        $nombre = Localite::
        where('pays_id', $id)
        ->count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne une localite sur base de son id
     * @return json localite
     */
    public function find($request, $response, $args)
    {
        $id = $args['id'];
        $localite = Localite::find($id);
        return json_encode($localite, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne des localites dont le nom contient un filtre triés par nom ascendant
     * @return json une collection de localites
     */
    public function getContaining($request, $response)
    {
        $filter = $request->getParam('filter');
        $searchByFilter = (is_null($filter) || $filter == 'null') ? false : true;
        $localite = Localite::
            when($searchByFilter, function ($query) use ($filter) {
            return $query->where('nom', 'like', '%' . $filter . '%');
        })
            ->orderBy('nom', 'asc')
            ->get();
        return json_encode($localite, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Insère une localite
     */
    public function insert($request, $response, $args)
    {
        $localite = Localite::create([
            'code_postal' => $request->getParam('code_postal'),
            'nom' => $request->getParam('nom'),
            'pays_id' => $request->getParam('pays_id'),
        ]);
        return json_encode($localite, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Met à jour une localite
     */
    public function update($request, $response, $args)
    {
        $id = $request->getParam('id');
        $localite = Localite::find($id);
        $localite->update([
            'code_postal' => $request->getParam('code_postal'),
            'nom' => $request->getParam('nom'),
            'pays_id' => $request->getParam('pays_id'),
        ]);
        return json_encode($localite, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
