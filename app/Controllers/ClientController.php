<?php

namespace App\Controllers;

use App\Models\Client;

class ClientController extends Controller {

    /**
     * Retourne tous les clients
     * @return json clients
     */
    public function getAll() {
        $clients = Client::orderBy('nom', 'asc')->get();
        return json_encode($clients, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de clients
     * @return json le nombre de clients
     */
    public function getCount() {
        $nombre = Client::count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne un client sur base de son id
     * @return json client
     */
    public function find($request, $response, $args) {
        $id = $args['id'];
        $client = Client::find($id);
        return json_encode($client, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Insère un client
     */
    public function insert($request, $response, $args) {
        $client = Client::create([
                    'nom' => $this->container->request->getParam('nom'),
                    'rue' => $this->container->request->getParam('rue'),
                    'numero' => $this->container->request->getParam('numero'),
                    'cp' => $this->container->request->getParam('cp'),
                    'localite' => $this->container->request->getParam('localite'),
                    'tel' => $this->container->request->getParam('tel'),
                    'email' => $this->container->request->getParam('email')
        ]);
        return json_encode($client, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Met à jour un client
     */
    public function update($request, $response, $args) {
        $id = $this->container->request->getParam('id');
        $client = Client::find($id);
        $client->update([
                    'nom' => $this->container->request->getParam('nom'),
                    'rue' => $this->container->request->getParam('rue'),
                    'numero' => $this->container->request->getParam('numero'),
                    'cp' => $this->container->request->getParam('cp'),
                    'localite' => $this->container->request->getParam('localite'),
                    'tel' => $this->container->request->getParam('tel'),
                    'email' => $this->container->request->getParam('email')
        ]);
        return json_encode($client, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Supprime un client sur base de son id
     * @return json client
     */
    public function delete($request, $response, $args) {
        $id = $args['id'];
        Client::destroy($id);
        return json_encode("", JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
