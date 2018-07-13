<?php

namespace App\Controllers;

use App\Models\Chien;
use Illuminate\Database\Capsule\Manager as DB;

class ChienController extends Controller
{

    /**
     * Retourne le nombre de chiens
     * @return json le nombre de chiens
     */
    public function getCount()
    {
        $nombre = Chien::count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de chiens pour une race
     * @return json le nombre de chiens
     */
    public function getCountByRace($request, $response, $args)
    {
        $race_id = $args['race_id'];
        $nombre = Chien::where('race_id', $race_id)->count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de chiens pour une robe
     * @return json le nombre de chiens
     */
    public function getCountByRobe($request, $response, $args)
    {
        $robe_id = $args['robe_id'];
        $nombre = Chien::where('robe_id', $robe_id)->count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de chiens pour un client
     * @return json le nombre de chiens
     */
    public function getCountByClient($request, $response, $args)
    {
        $client_id = $args['client_id'];
        $nombre = Chien::where('client_id', $client_id)->count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne les années de naissance (distinct) des chiens
     * @return json les années de naissance
     */
    public function getDistinctBirthYear()
    {
        $result = DB::select('select * from chiens_distinct_annee_naissance');
        $years = [];
        return json_encode($years, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); 
    }

    /**
     * Retourne un chien sur base de son id
     * @return json chien
     */
    public function find($request, $response, $args)
    {
        $id = $args['id'];
        $chien = Chien::find($id);
        return json_encode($chien, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne une liste de chiens sur base de critères standard
     * @return json chiens
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

        $chiens = Chien::
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

        return json_encode($chiens, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne une liste de chiens sur base du critère 'appartenant à un client'
     * @return json chiens
     */
    public function getSearchByClient($request, $response)
    {
        $client = $request->getParam('proprietaire');

        $chiens = Chien::leftJoin('clients', function ($join) {
            $join->on('chiens.client_id', '=', 'clients.id');
        })
            ->where('clients.nom', 'like', '%' . $client . '%')
            ->orderBy('nom', 'asc')
            ->orderBy('affixe', 'asc')
            ->get(['chiens.*']);

        return json_encode($chiens, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Crée ou met à jour un chien
     */
    public function save($request, $response, $args)
    {
        $id = $this->container->request->getParam('id');
        if($id){
            $chien = Chien::find($id);
        }else{
            $chien = new Chien;
        };
        $chien->save([
            'nom' => $this->container->request->getParam('nom'),
            'affixe' => $this->container->request->getParam('affixe'),
            'sexe' => $this->container->request->getParam('sexe'),
            'race_id' => $this->container->request->getParam('race_id'),
            'robe_id' => $this->container->request->getParam('robe_id'),
            'date_naissance' => $this->container->request->getParam('date_naissance'),
            'date_deces' => $this->container->request->getParam('date_deces'),
            'pere_id' => $this->container->request->getParam('pere_id'),
            'mere_id' => $this->container->request->getParam('mere_id'),
            'puce' => $this->container->request->getParam('puce'),
            'passeport' => $this->container->request->getParam('passeport'),
            'tatouage' => $this->container->request->getParam('tatouage'),
            'client_id' => $this->container->request->getParam('client_id'),
            'portee_id' => $this->container->request->getParam('portee_id'),
            'chiot_id' => $this->container->request->getParam('chiot_id'),
            'present' => $this->container->request->getParam('present'),
            'produit' => $this->container->request->getParam('produit'),
            'remarques' => $this->container->request->getParam('remarques'),
        ]);
        return json_encode($chien, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Supprime un chien sur base de son id
     * @return void
     */
    public function delete($request, $response, $args)
    {
        $id = $args['id'];
        Chien::destroy($id);
        return json_encode("", JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
