<?php

namespace App\Controllers;

use App\Models\Chien;
use Illuminate\Support\Facades\DB as DB;

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
     * Retrouver le père/la mère du chien 'doggy'
     * SELECT * FROM `chiens` as p LEFT JOIN `chiens` as c ON p.id = c.pere_id where c.pere_id is not null and c.nom = 'doggy'
     * SELECT * FROM `chiens` as p LEFT JOIN `chiens` as c ON p.id = c.mere_id where c.mere_id is not null and c.nom = 'doggy'
     *
     * Retrouver les enfants dont le père / la mère est 'doggy father' / 'doggy mother'
     * SELECT * FROM `chiens` as c LEFT JOIN `chiens` as p ON c.pere_id = p.id where c.pere_id is not null and p.nom = 'doggy father'
     * SELECT * FROM `chiens` as c LEFT JOIN `chiens` as p ON c.mere_id = p.id where c.mere_id is not null and p.nom = 'doggy mother'
     */

    public function getByCriteria($request, $response)
    {
        $nom = $request->getParam('nom');
        $affixe = $request->getParam('affixe');
        $race = $request->getParam('race');
        $robe = $request->getParam('robe');
        $sexe = $request->getParam('sexe');
        $present = $request->getParam('present');
        $produit = $request->getParam('produit');
        $vivant = $request->getParam('vivant');
        $naissanceDu = $request->getParam('naissanceDu');
        $naissanceAu = $request->getParam('naissanceAu');
        $decesDu = $request->getParam('decesDu');
        $decesAu = $request->getParam('decesAu');
        $passeport = $request->getParam('passeport');
        $puce = $request->getParam('puce');
        $tatouage = $request->getParam('tatouage');
        $nomClient = $request->getParam('nomClient');

        $searchByNom = (is_null($nom) || $nom == 'null') ? false : true;
        $searchByAffixe = (is_null($affixe) || $affixe == 'null') ? false : true;
        $searchByRace = (is_null($race) || $race == -1) ? false : true;
        $searchByRobe = (is_null($robe) || $robe == -1) ? false : true;
        $searchBySexe = (is_null($sexe)) ? false : true;
        $searchByPresent = (is_null($present)) ? false : true;
        $searchByProduit = (is_null($produit)) ? false : true;
        $searchByVivantY = (!is_null($vivant) && $vivant == '1') ? true : false;
        $searchByVivantN = (!is_null($vivant) && $vivant == '0') ? true : false;
        $searchByNaissanceDu = (is_null($naissanceDu)) ? false : true;
        $searchByNaissanceAu = (is_null($naissanceAu)) ? false : true;
        $searchByDecesDu = (is_null($decesDu)) ? false : true;
        $searchByDecesAu = (is_null($decesAu)) ? false : true;
        $searchByPasseport = (is_null($passeport)) ? false : true;
        $searchByPuce = (is_null($puce)) ? false : true;
        $searchByTatouage = (is_null($tatouage)) ? false : true;
        $searchByNomClient = (is_null($nomClient)) ? false : true;

        if($searchByNomClient){
            $chiens = Chien::leftJoin('clients', function ($join) {
                $join->on('chiens.client_id', '=', 'clients.id');
            })
                ->where('clients.nom', 'like', '%' . $nomClient . '%')
                ->orderBy('nom', 'asc')
                ->orderBy('affixe', 'asc')
                ->get(['chiens.*']);
            return json_encode($chiens, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        };

        $chiens = Chien::
            when($searchByNom, function ($query) use ($nom) {
            return $query->where('nom', 'like', '%' . $nom . '%');
        })->when($searchByAffixe, function ($query) use ($affixe) {
            return $query->where('affixe', 'like', '%' . $affixe . '%');
        })->when($searchByRace, function ($query) use ($race) {
            return $query->where('race_id', '=', $race);
        })->when($searchByRobe, function ($query) use ($robe) {
            return $query->where('robe_id', '=', $robe);
        })->when($searchBySexe, function ($query) use ($sexe) {
            return $query->where('sexe', '=', $sexe);
        })->when($searchByPresent, function ($query) use ($present) {
            return $query->where('present', '=', $present);
        })->when($searchByProduit, function ($query) use ($produit) {
            return $query->where('produit', '=', $produit);
        })->when($searchByVivantY, function ($query) {
            return $query->whereNull('date_deces');
        })->when($searchByVivantN, function ($query) {
            return $query->whereNotNull('date_deces');
        })->when($searchByNaissanceDu, function ($query) use ($naissanceDu) {
            return $query->where('date_naissance', '>=', $naissanceDu);
        })->when($searchByNaissanceAu, function ($query) use ($naissanceAu) {
            return $query->where('date_naissance', '<=', $naissanceAu);
        })->when($searchByDecesDu, function ($query) use ($decesDu) {
            return $query->where('date_deces', '>=', $decesDu);
        })->when($searchByDecesAu, function ($query) use ($decesAu) {
            return $query->where('date_deces', '<=', $decesAu);
        })->when($searchByPasseport, function ($query) use ($passeport) {
            return $query->where('passeport', 'like', '%' . $passeport . '%');
        })->when($searchByPuce, function ($query) use ($puce) {
            return $query->where('puce', 'like', '%' . $puce . '%');
        })->when($searchByTatouage, function ($query) use ($tatouage) {
            return $query->where('tatouage', 'like', '%' . $tatouage . '%');
        })
        ->orderBy('nom', 'asc')->orderBy('affixe', 'asc')->get();

        return json_encode($chiens, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
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
        if ($id) {
            $chien = Chien::find($id);
        } else {
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
