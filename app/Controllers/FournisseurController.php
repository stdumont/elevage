<?php

namespace App\Controllers;

use App\Models\Fournisseur;

class FournisseurController extends Controller {

    /**
     * Retourne tous les fournisseurs
     * @return json fournisseurs
     */
    public function getAll() {
        $fournisseurs = Fournisseur::orderBy('nom', 'asc')->get();
        return json_encode($fournisseurs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de fournisseurs
     * @return json le nombre de fournisseurs
     */
    public function getCount() {
        $nombre = Fournisseur::count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne un fournisseur sur base de son id
     * @return json fournisseur
     */
    public function find($request, $response, $args) {
        $id = $args['id'];
        $fournisseur = Fournisseur::find($id);
        return json_encode($fournisseur, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Insère un fournisseur
     */
    public function insert($request, $response, $args) {
        $fournisseur = Fournisseur::create([
                    'nom' => $this->container->request->getParam('nom'),
                    'rue' => $this->container->request->getParam('rue'),
                    'numero' => $this->container->request->getParam('numero'),
                    'cp' => $this->container->request->getParam('cp'),
                    'localite' => $this->container->request->getParam('localite'),
                    'tel' => $this->container->request->getParam('tel'),
                    'email' => $this->container->request->getParam('email'),
                    'tva' => $this->container->request->getParam('tva'),
                    'banque' => $this->container->request->getParam('banque')
        ]);
        return json_encode($fournisseur, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Met à jour un fournisseur
     */
    public function update($request, $response, $args) {
        $id = $this->container->request->getParam('id');
        $fournisseur = Fournisseur::find($id);
        $fournisseur->update([
                    'nom' => $this->container->request->getParam('nom'),
                    'rue' => $this->container->request->getParam('rue'),
                    'numero' => $this->container->request->getParam('numero'),
                    'cp' => $this->container->request->getParam('cp'),
                    'localite' => $this->container->request->getParam('localite'),
                    'tel' => $this->container->request->getParam('tel'),
                    'email' => $this->container->request->getParam('email'),
                    'tva' => $this->container->request->getParam('tva'),
                    'banque' => $this->container->request->getParam('banque')
        ]);
        return json_encode($fournisseur, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Supprime un fournisseur sur base de son id
     * @return json fournisseur
     */
    public function delete($request, $response, $args) {
        $id = $args['id'];
        Fournisseur::destroy($id);
        return json_encode("", JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
