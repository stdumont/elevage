<?php

namespace App\Controllers;

use App\Models\User;

class UserController extends Controller {

    public function getUserOne($request, $response) {

        $user = User::find(1);
        return json_encode($user, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        // $user = User::find(1);
        // var_dump($user);
        // die();
        // User::create([
        //     'name' => 'Catherine Delange',
        //     'email' => 'catherine.delange@skynet.be',
        //     'password' => '123'
        // ]);
//        $this->logger->addInfo('We are in HomeController:index');

//        return $this->view->render($response, 'home.twig');
    }

}
