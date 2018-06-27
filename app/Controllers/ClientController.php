<?php

namespace App\Controllers;

use App\Models\Client;

class ClientController extends Controller
{

    /**
     * Retourne tous les clients
     * @return json clients
     */
    public function getAll()
    {
        $clients = Client::orderBy('nom', 'asc')->get();
        return json_encode($clients, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne une liste de clients sur base de critères standard
     * @return json clients
     */
    public function getSearchStandard($request, $response)
    {
        $nom = $request->getParam('nom');
        $prenom = $request->getParam('prenom');
        $tel = $request->getParam('tel');
        $email = $request->getParam('email');
        $codePostal = $request->getParam('codePostal');
        $localite = $request->getParam('localite');
        $pays = $request->getParam('pays');

        $searchByNom = (is_null($nom) || $nom == 'null') ? false : true;
        $searchByPrenom = (is_null($prenom) || $prenom == 'null') ? false : true;
        $searchByTel = (is_null($tel) || $tel == 'null') ? false : true;
        $searchByEmail = (is_null($email) || $email == 'null') ? false : true;
        $searchByCodePostal = (is_null($codePostal) || $codePostal == 'null') ? false : true;
        $searchByLocalite = (is_null($localite) || $localite == 'null') ? false : true;
        $searchByPays = (is_null($pays) || $pays == 'null') ? false : true;

        $clients = Client::
            when($searchByNom, function ($query) use ($nom) {
            return $query->where('nom', 'like', '%' . $nom . '%');
        })->when($searchByPrenom, function ($query) use ($prenom) {
            return $query->where('prenom', 'like', '%' . $prenom . '%');
        })->when($searchByTel, function ($query) use ($tel) {
            return $query->where('tel1', 'like', '%' . $tel . '%')->orWhere('tel2', 'like', '%' . $tel . '%');
        })->when($searchByEmail, function ($query) use ($email) {
            return $query->where('email', 'like', '%' . $email . '%');
        })->when($searchByCodePostal, function ($query) use ($codePostal) {
            return $query->where('code_postal', 'like', '%' . $codePostal . '%');
        })->when($searchByLocalite, function ($query) use ($localite) {
            return $query->where('localite', 'like', '%' . $localite . '%');
        })->when($searchByPays, function ($query) use ($pays) {
            return $query->where('pays', 'like', '%' . $pays . '%');
        })->orderBy('nom', 'asc')->orderBy('prenom', 'asc')->get();

        return json_encode($clients, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne une liste de clients sur base du critère propriétaire du chien
     * @return json clients
     */
    public function getSearchByDog($request, $response)
    {
        $chien = $request->getParam('proprietaire');

        $clients = Client::leftJoin('chiens', function ($join) {
            $join->on('clients.id', '=', 'chiens.client_id');
        })
            ->where('chiens.nom', 'like', '%' . $chien . '%')
            ->orderBy('nom', 'asc')
            ->orderBy('prenom', 'asc')
            ->get(['clients.*']);

        return json_encode($clients, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de clients
     * @return json le nombre de clients
     */
    public function getCount()
    {
        $nombre = Client::count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne un client sur base de son id
     * @return json client
     */
    public function find($request, $response, $args)
    {
        $id = $args['id'];
        $client = Client::find($id);
        return json_encode($client, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Insère un client
     */
    public function insert($request, $response, $args)
    {
        $client = Client::create([
            'nom' => $this->container->request->getParam('nom'),
            'prenom' => $this->container->request->getParam('prenom'),
            'rue' => $this->container->request->getParam('rue'),
            'numero' => $this->container->request->getParam('numero'),
            'code_postal' => $this->container->request->getParam('code_postal'),
            'localite' => $this->container->request->getParam('localite'),
            'pays' => $this->container->request->getParam('pays'),
            'tel' => $this->container->request->getParam('tel'),
            'email' => $this->container->request->getParam('email'),
            'remarques' => $this->container->request->getParam('remarques'),
        ]);
        return json_encode($client, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Met à jour un client
     */
    public function update($request, $response, $args)
    {
        $id = $this->container->request->getParam('id');
        $client = Client::find($id);
        $client->update([
            'nom' => $this->container->request->getParam('nom'),
            'prenom' => $this->container->request->getParam('prenom'),
            'rue' => $this->container->request->getParam('rue'),
            'numero' => $this->container->request->getParam('numero'),
            'code_postal' => $this->container->request->getParam('code_postal'),
            'localite' => $this->container->request->getParam('localite'),
            'pays' => $this->container->request->getParam('pays'),
            'tel' => $this->container->request->getParam('tel'),
            'email' => $this->container->request->getParam('email'),
            'remarques' => $this->container->request->getParam('remarques'),
        ]);
        return json_encode($client, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Supprime un client sur base de son id
     * @return json client
     */
    public function delete($request, $response, $args)
    {
        $id = $args['id'];
        Client::destroy($id);
        return json_encode("", JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
