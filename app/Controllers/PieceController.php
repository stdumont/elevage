<?php

namespace App\Controllers;

use App\Models\Piece;

class PieceController extends Controller {
    
    /**
     * Supprime une pièce et son fichier (delete cascade) sur base de son id
     * @return json document
     */
    public function delete($request, $response, $args) {
        $id = $args['id'];
        Piece::destroy($id);
        return json_encode("", JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    public function insert($request, $response, $args){
        $piece = $request->getParam('piece');

        $id = Piece::insertGetId([
            'document_id' => $piece["document_id"],
            'nom' => $piece["nom"],
            'type' => $piece["type"],
            'taille' => $piece["taille"]
        ]);

        return json_encode($id, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
