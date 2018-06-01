<?php

namespace App\Controllers;

use App\Models\Document;
use App\Models\Piece;
use Illuminate\Database\Capsule\Manager as DB;

class DocumentController extends Controller {

    /**
     * Retourne tous les documents
     * @return json documents
     */
    public function getAll() {
        $documents = Document::orderBy('date_document', 'desc')->get();
        return json_encode($documents, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de documents
     * @return json le nombre de documents
     */
    public function getCount() {
        $nombre = Document::count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de documents sur base d'un type de document
     * @return json le nombre de documents
     */
    public function getCountByTypedoc($request, $response, $args) {
        $id = $args['id'];
        $nombre = Document::where('typedoc_id', $id)->count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de documents sur base d'un fournisseur
     * @return json le nombre de documents
     */
    public function getCountByFournisseur($request, $response, $args) {
        $id = $args['id'];
        $nombre = Document::where('fournisseur_id', $id)->count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le nombre de documents sur base d'un client
     * @return json le nombre de documents
     */
    public function getCountByClient($request, $response, $args) {
        $id = $args['id'];
        $nombre = Document::where('client_id', $id)->count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }


    /**
     * Retourne des documents sur base de critères
     * @return json une collection de documents
     */
    public function getByCriterias($request, $response) {
        $filter = $request->getParam('filter');
        $typedoc_id = $request->getParam('typedoc_id');
        $fournisseur_id = $request->getParam('fournisseur_id');
        $client_id = $request->getParam('client_id');
        $dated = $request->getParam('dated');
        $datef = $request->getParam('datef');
        $searchByFilter = (is_null($filter) || $filter == 'null') ? false : true;
        $searchByTypedoc = (is_null($typedoc_id) || $typedoc_id == '-1') ? false : true;
        $searchByClient = (is_null($client_id) || $client_id == '-1') ? false : true;
        $searchByFournisseur = (is_null($fournisseur_id) || $fournisseur_id == '-1') ? false : true;
        $searchByDated = (is_null($dated)) ? false : true;
        $searchByDatef = (is_null($datef)) ? false : true;
        $documents = Document::
                when($searchByFournisseur, function ($query) use ($fournisseur_id) {
                    return $query->where('fournisseur_id', $fournisseur_id);
                })
                ->when($searchByClient, function ($query) use ($client_id) {
                    return $query->where('client_id', $client_id);
                })
                ->when($searchByTypedoc, function ($query) use ($typedoc_id) {
                    return $query->where('typedoc_id', $typedoc_id);
                })
                ->when($searchByFilter, function ($query) use ($filter) {
                    return $query->where('nom', 'like', '%'. $filter . '%')
                                 ->orWhere('description', 'like', '%'. $filter . '%')
                                 ->orWhere('communication', 'like', '%'. $filter . '%');
                })
                ->when($searchByDated, function ($query) use ($dated){
                    return $query->where('date_document', '>=', $dated);
                })
                ->when($searchByDatef, function ($query) use ($datef){
                    return $query->where('date_document', '<=', $datef);
                })
                ->orderBy('date_document', 'desc')
                ->get();
        return json_encode($documents, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne un document sur base de son id
     * @return json document
     */
    public function find($request, $response, $args) {
        $id = $args['id'];
        $document = Document::find($id);
        return json_encode($document, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Insère un document
     */
    public function insert($request, $response, $args) {
        $document = Document::create([
                    'typedoc_id' => $request->getParam('typedoc_id'),
                    'client_id' => $request->getParam('client_id'),
                    'fournisseur_id' => $request->getParam('fournisseur_id'),
                    'nom' => $request->getParam('nom'),
                    'description' => $request->getParam('description'),
                    'rd' => $request->getParam('rd'),
                    'communication' => $request->getParam('communication'),
                    'montant_htva' => $request->getParam('montant_htva'),
                    'montant_tva' => $request->getParam('montant_tva'),
                    'montant_tvac' => $request->getParam('montant_tvac'),
                    'regle' => $request->getParam('regle'),
                    'solde' => $request->getParam('solde'),
                    'date_document' => $request->getParam('date_document'),
                    'date_echeance' => $request->getParam('date_echeance'),
        ]);
        return json_encode($document, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Met à jour un document
     */
    public function update($request, $response, $args) {
        $id = $this->container->request->getParam('id');
        $document = Document::find($id);
        $document->update([
            'typedoc_id' => $request->getParam('typedoc_id'),
            'client_id' => $request->getParam('client_id'),
            'fournisseur_id' => $request->getParam('fournisseur_id'),
            'nom' => $request->getParam('nom'),
            'description' => $request->getParam('description'),
            'rd' => $request->getParam('rd'),
            'communication' => $request->getParam('communication'),
            'montant_htva' => $request->getParam('montant_htva'),
            'montant_tva' => $request->getParam('montant_tva'),
            'montant_tvac' => $request->getParam('montant_tvac'),
            'regle' => $request->getParam('regle'),
            'solde' => $request->getParam('solde'),
            'date_document' => $request->getParam('date_document'),
            'date_echeance' => $request->getParam('date_echeance')
        ]);
        return json_encode($document, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Supprime un document, ses pièces jointes et fichiers sur base de son id (delete cascade 2 fois)
     * @return json document
     */
    public function delete($request, $response, $args) {
        // DB::beginTransaction();
        $id = $args['id'];
        Document::destroy($id);
        // DB::commit();
        return json_encode("", JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
