<?php

namespace App\Controllers;

use App\Models\Portee;

class PorteeController extends Controller
{

    /**
     * Retourne toutes les portees
     * @return json portees
     */
    public function getAll()
    {
        $portees = Portee::orderBy('numero', 'desc')->get();
        return json_encode($portees, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

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
     * Retourne une Portee sur base de son id
     * @return json Portee
     */
    public function find($request, $response, $args)
    {
        $id = $args['id'];
        $portee = Portee::find($id);
        return json_encode($portee, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
