<?php

namespace App\Controllers;

use App\Models\Typedoc;

class TypeDocumentController extends Controller
{

    /**
     * Retourne tous les types de documents
     * @return json types de documents
     */
    public function getAll()
    {
        $typedocs = Typedoc::orderBy('nom', 'asc')->get();
        $typedocsToSelect = array();
        foreach ($typedocs as $key => $typedoc){
            $typedocsToSelect[] = array('id' => $typedoc->id, 'text' => $typedoc->nom, 'nom' => $typedoc->nom);
        }
        return json_encode($typedocsToSelect, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne un type de document sur base de son id
     * @return json type de document
     */
    public function find($request, $response, $args)
    {
        $id = $args['id'];
        $typedoc = Typedoc::find($id);
        return json_encode($typedoc, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Insère un type de document
     */
    public function insert($request, $response, $args)
    {
        $typedoc = Typedoc::create([
            'nom' => $this->container->request->getParam('nom'),
        ]);
        return json_encode($typedoc, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Met à jour un type de document
     */
    public function update($request, $response, $args)
    {
        $id = $this->container->request->getParam('id');
        $typedoc = Typedoc::find($id);
        $typedoc->update([
            'nom' => $this->container->request->getParam('nom'),
        ]);
        return json_encode($typedoc, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Supprime un type de document sur base de son id
     * @return json type de document
     */
    public function delete($request, $response, $args)
    {
        $id = $args['id'];
        Typedoc::destroy($id);
        return json_encode("", JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
