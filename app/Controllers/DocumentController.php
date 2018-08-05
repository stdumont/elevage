<?php

namespace App\Controllers;

use App\Models\Document;
use App\Models\Fichier;

class DocumentController extends Controller
{

    /**
     * Retourne le nombre de documents pour un type de document donné
     * @return json nombre
     */
    public function getCountByTypedoc($request, $response, $args)
    {
        $id = $args['id'];
        $nombre = Document::
            where('typedoc_id', $id)
            ->count();
        return json_encode($nombre, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne une liste de documents pour un chien donné
     * @return json liste de documents
     */
    public function getByChien($request, $response, $args) {
        $id = $args['id'];
        $documents = Document::
            where('chien_id', $id)
            ->orderBy('nom', 'asc')
            ->get();
        return json_encode($documents, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne le fichier attaché à un document donné
     * @return binary fichier
     */
    public function getFichier($request, $response, $args){
        $id = $args['id'];
        $fichier = Fichier::where('document_id', $id)->first();
        $content = $this->response->getBody();
		$content->write($fichier["donnee"]);

        $response = $this->response->withHeader('Content-Type', $fichier["contentType"])
                                   ->withHeader('Content-Transfer-Encoding', 'binary')
                                   ->withHeader('Content-Disposition', 'inline; filename="' . $fichier["nomFichier"] . '"');
		
		return $response;
    }

    /**
     * Supprime un document (et son fichier : delete cascade)
     * @return json ""
     */
    public function delete($request, $response, $args){
        $id = $args['id'];
        Document::destroy($id);
        return json_encode("", JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    public function insert($request, $response, $args)
    {
        $document = Document::create([
            'typedoc_id' => $this->container->request->getParam('typedoc_id'),
            'chien_id' => $this->container->request->getParam('chien_id'),
            'nom' => $this->container->request->getParam('nom'),
            'description' => $this->container->request->getParam('description'),
            'date_document' => $this->container->request->getParam('date_document')
        ]);
        return json_encode($document, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    public function insertFichier($request, $response, $args)
    {
        $fichier = Fichier::create([
            'document_id' => $this->container->request->getParam('document_id'),
            'nomFichier' => $this->container->request->getParam('nomFichier'),
            'contentType' => $this->container->request->getParam('contentType'),
            'taille' => $this->container->request->getParam('taille'),
            'donnee' => base64_decode($this->container->request->getParam('donnee'))
        ]);
        return json_encode($fichier, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }


}
