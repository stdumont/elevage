<?php

namespace App\Controllers;

class HomeController extends Controller {

    public function index($request, $response) {
        $data = ['version' => '0.1'];
        return $this->view->render($response, 'home.twig', $data);
    }

}
