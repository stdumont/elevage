<?php

/**
 * Classe chargée de vérifier l'authentification d'un utilisateur
 * 
 * @author Stéphane Dumont <dumont.stephane@gmail.com>
 */

namespace app\Auth;

use App\Models\User;

class Auth {
    
    /**
     * Vérifie l'identifiant et le mot de passe
     * 
     * Le mot de passe introduit en clair ($password) est vérifié avec l'instruction PHP password_verify() par rapport au mot de passe
     * hashé stocké en base de données ($user->password).
     * 
     * Le hashage peut être effectué avec l'instruction PHP password_hash('xxxxxx', PASSWORD_DEFAULT). 
     * 
     * @param : $email - l'adresse mail
     * @param : $password - le mot de passe en clair tel que'introduit dans le formulaire de login
     * @return : boolean : true = OK, false = erreur d'identification
     */
    public function attempt($email, $password) {
        
        $user = User::where('email', $email)->first();
        
        if(!$user){
            return false;
        }
        
        if(password_verify($password, $user->password)){
            $_SESSION['user'] = $user->id;
            return true;
        }
        
        return false;
    }
    
    /**
     * Renvoie si l'utilisateur est connecté
     * 
     * @return : boolean : true = Oui, false = non
     */
    public function check() {
        return isset($_SESSION['user']);
    }
}
