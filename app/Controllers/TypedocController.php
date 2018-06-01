<?php

namespace App\Controllers;

use App\Models\Typedoc;

class TypedocController extends Controller {

    /**
     * Retourne tous les types de document
     * @return json types de document
     */
    public function getAll() {
        $typedocs = Typedoc::orderBy('nom', 'asc')->get();
        return json_encode($typedocs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne un type de document sur base de son id
     * @return json type de document
     */
    public function find($request, $response, $args) {
        $id = $args['id'];
        $typedoc = Typedoc::find($id);
        return json_encode($typedoc, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Insère un type de document
     */
    public function insert($request, $response, $args) {
        $typedoc = Typedoc::create([
                    'nom' => $this->container->request->getParam('nom'),
                    'rd' => $this->container->request->getParam('rd')
        ]);
        return json_encode($typedoc, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Met à jour un type de document
     */
    public function update($request, $response, $args) {
        $id = $this->container->request->getParam('id');
        $typedoc = Typedoc::find($id);
        $typedoc->update([
            'nom' => $this->container->request->getParam('nom'),
            'rd' => $this->container->request->getParam('rd')
        ]);
        return json_encode($typedoc, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Supprime un type de document sur base de son id
     * @return json type de document
     */
    public function delete($request, $response, $args) {
        $id = $args['id'];
        Typedoc::destroy($id);
        return json_encode("", JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
