<?php

namespace App\Controllers;

use App\Models\User;

class UserController extends Controller {

    public function getUserOne($request, $response) {

        $user = User::find(1);
        return json_encode($user, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

}
