<?php

namespace App\Controllers;

use App\Models\Piece;
use App\Models\Fichier;

class FichierController extends Controller {
    
    /**
     * Effectue l'upload d'un fichier
     * @return json document
     */
    public function upload($request, $response, $args){

        var_dump($request);
        die();

        $piece_id = Piece::max('id');
        if(!$piece_id){
            $piece_id = 1;
        }

        $tmpName  = $_FILES['file']['tmp_name'];
        $fp      = fopen($tmpName, 'r');
        $content = fread($fp, filesize($tmpName));
        fclose($fp);

        $id = Fichier::insertGetId([
            'piece_id' => $piece_id,
            'donnee' => $content,
        ]);

        return json_encode($id, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    public function getByPiece($request, $response, $args){
        $piece_id = $args['id'];
        $fichier = Fichier::where('piece_id', $piece_id)->first();

        $content = $this->response->getBody();
		$content->write($fichier["donnee"]);

        $response = $this->response->withHeader('Content-Type', $fichier["piece"]["type"])
                                   ->withHeader('Content-Transfer-Encoding', 'binary')
                                   ->withHeader('Content-Disposition', 'inline; filename="' . $fichier["piece"]["nom"] . '"');
		
		return $response;
    }

    public function getById($request, $response, $args){
        $fichier_id = $args['id'];
        $fichier = Fichier::find($fichier_id);
        $fichier["donnee"] = null;
        return json_encode($fichier, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
