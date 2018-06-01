<?php

namespace App\Controllers;

use App\Models\Parameter;

class ParameterController extends Controller {
    
    /**
     * Retourne le nom de l'application
     * @return json nom de l'application
     */
    public function getApplicationName(){
        return $this->getByName('APP_NAME');
    }
    
    /**
     * Retourne la version de l'application
     * @return json version de l'application
     */
    public function getApplicationVersion(){
        return $this->getByName('APP_VERSION');
    }
    
    /**
     * Retourne l'année de création de l'application
     * @return json année de création de l'application
     */
    public function getApplicationCreationYear(){
        return $this->getByName('APP_CREATION_YEAR');
    }
    
    /**
     * Retourne le nom du créateur de l'application
     * @return json nom du createur de l'application
     */
    public function getApplicationCreatorName(){
        return $this->getByName('APP_AUTHOR');
    }
    
    /**
     * Retourne l'e-mail du créateur de l'application
     * @return json e-mail du createur de l'application
     */
    public function getApplicationCreatorMail(){
        return $this->getByName('APP_AUTHOR_MAIL');
    }

    /**
     * Retourne un paramètre su base de son nom
     * @param type $name nom du paramètre à rechercher
     * @return type json paramètre
     */
    private function getByName($name) {
        $parameter = Parameter::where('nom', $name)->first();
        return json_encode($parameter, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
