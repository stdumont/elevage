<?php

namespace App\Controllers;

use App\Models\Pays;
use App\Models\Localite;

class PaysController extends Controller
{

    /**
     * Retourne tous les pays
     * @return json pays
     */
    public function getAll()
    {
        $pays = Pays::orderBy('nom', 'asc')->get();
        return json_encode($pays, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de pays
     * @return json le nombre de pays
     */
    public function getCount()
    {
        $nombre = Pays::count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de références d'un pays dans les localités
     * @return json le nombre de références
     */
    public function getReferenceInLocaliteCount($request, $response, $args)
    {
        $id = $args['id'];
        $nombre = Localite::
        where('pays_id', $id)
        ->count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne un pays sur base de son id
     * @return json pays
     */
    public function find($request, $response, $args)
    {
        $id = $args['id'];
        $pays = Pays::find($id);
        return json_encode($pays, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne des pays dont le nom contient un filtre triés par nom ascendant
     * @return json une collection de pays
     */
    public function getContaining($request, $response)
    {
        $filter = $request->getParam('filter');
        $searchByFilter = (is_null($filter) || $filter == 'null') ? false : true;
        $pays = Pays::
            when($searchByFilter, function ($query) use ($filter) {
            return $query->where('nom', 'like', '%' . $filter . '%');
        })
            ->orderBy('nom', 'asc')
            ->get();
        return json_encode($pays, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Insère un pays
     */
    public function insert($request, $response, $args)
    {
        $pays = Pays::create([
            'nom' => $request->getParam('nom'),
        ]);
        return json_encode($pays, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Met à jour un pays
     */
    public function update($request, $response, $args)
    {
        $id = $request->getParam('id');
        $pays = Pays::find($id);
        $pays->update([
            'nom' => $request->getParam('nom'),
        ]);
        return json_encode($pays, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
