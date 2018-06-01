<?php

/**
 * Classe controleur pour les actions de login/logout
 * 
 * @author Stéphane Dumont <dumont.stephane@email.com>
 */

namespace App\Controllers;

use Respect\Validation\Validator as v;
use App\Models\User;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

class AuthController extends Controller {


    /**
     * Envoi le formulaire de login à l'utilisateur
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return vue 'login.twig'
     */
    public function getLogin(ServerRequestInterface $request, ResponseInterface $response) {

        return $this->view->render($response, 'login.twig');
    }

    /**
     * Récupère le formulaire de login après le submit, le vérifie 
     * et authentifie l'utilisateur.
     * Si tout est OK : redirection vers la homepage
     * Sinon message et retour sur le formulaire de login
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return void
     */
    public function postLogin(ServerRequestInterface $request, ResponseInterface $response) {

        $validation = $this->validator->validate($request, [
            'email' => v::noWhitespace()->notEmpty(),
            'password' => v::noWhitespace()->notEmpty(),
        ]);

        if ($validation->failed()) {
            return $response->withRedirect($this->router->pathFor('auth.login'));
        };

        $auth = $this->auth->attempt(
                $request->getParam('email'), $request->getParam('password')
        );

        if (!$auth) {
            $this->flash->addMessage('global', 'L\'adresse email est inconnue ou le mot de passe est incorrect');
            return $response->withRedirect($this->router->pathFor('auth.login'));
        }

        $this->container['logger']->info('User connected : ' . $request->getParam('email'));

        return $response->withRedirect($this->router->pathFor('home'));
    }

    /**
     * Méthode appelée lors de la demande de déconnexion
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return void
     */
    public function postLogout(ServerRequestInterface $request, ResponseInterface $response) {
        if (isset($_SESSION['user'])) {
            $user = User::find($_SESSION['user']);
            unset($_SESSION['user']);
            $this->container['logger']->info('User disconnected : ' . $user->email);
        } else {
            $user = null;
        }
        return $response->withRedirect($this->router->pathFor('auth.login'));
    }

    /**
     * Détermine si un utilisateur est connecté
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return boolean
     * @uses Auth::check Vérification
     */
    public function isLoggedIn(ServerRequestInterface $request, ResponseInterface $response) {
        return json_encode($this->auth->check(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Retourne les informations de l'utilisateur courant connecté
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return utilisateur (json)
     */
    public function getCurrentUser(ServerRequestInterface $request, ResponseInterface $response) {
        if (isset($_SESSION['user'])) {
            $user = User::find($_SESSION['user']);
        } else {
            $user = null;
        }
        return json_encode($user, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
