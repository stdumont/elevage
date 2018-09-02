<?php

namespace App\Controllers;

use App\Models\Portee;

class PorteeController extends Controller
{

    /**
     * Retourne le nombre de portees
     * @return json le nombre de portees
     */
    public function getCount()
    {
        $nombre = Portee::count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne une liste de portées sur base de critères de recherche
     * @return json liste de portées
     */
    public function getByCriteria($request, $response)
    {
        $pere = $request->getParam('pere');
        $mere = $request->getParam('mere');
        $naissanceDu = $request->getParam('naissanceDu');
        $naissanceAu = $request->getParam('naissanceAu');

        $searchByPere = (is_null($pere) || $pere == -1) ? false : true;
        $searchByMere = (is_null($mere) || $mere == -1) ? false : true;
        $searchByNaissanceDu = (is_null($naissanceDu)) ? false : true;
        $searchByNaissanceAu = (is_null($naissanceAu)) ? false : true;

        $portees = Portee::
            when($searchByPere, function ($query) use ($pere) {
            return $query->where('pere_id', '=', $pere);
        })->when($searchByMere, function ($query) use ($mere) {
            return $query->where('mere_id', '=', $mere);
        })->when($searchByNaissanceDu, function ($query) use ($naissanceDu) {
            return $query->where('date_naissance', '>=', $naissanceDu);
        })->when($searchByNaissanceAu, function ($query) use ($naissanceAu) {
            return $query->where('date_naissance', '<=', $naissanceAu);
        })
            ->orderBy('date_naissance', 'desc')
            ->get();

        return json_encode($portees, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
