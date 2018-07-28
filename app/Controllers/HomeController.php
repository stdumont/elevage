<?php

namespace App\Controllers;

class HomeController extends Controller {

    public function index($request, $response) {
        $data = ['version' => '1.0'];
        return $this->view->render($response, 'home.twig', $data);
    }

}
