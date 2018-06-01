<?php

namespace App\Middleware;

class IsLoggedInMiddleware extends Middleware {

    public function __invoke($request, $response, $next) {

        $routeName = $request->getUri()->getPath();
        
        $publicRoutesArray = array(
            '/api',
            '/login',
            '/logout',
            '/isLoggedIn'
        );

        $found = false;
        foreach ($publicRoutesArray as $key => $publicRoute) {
            if (substr($routeName, 0, strlen($publicRoute)) === $publicRoute) {
                $found = true;
            };
        };
        
        if ($found && strlen($routeName) > 1) {
            $response = $next($request, $response);
        } else {
            if (!isset($_SESSION['user'])) {
                // redirect the user to the login page and do not proceed.
                $response = $response->withRedirect('/login');
            } else {
                // Proceed as normal...
                $response = $next($request, $response);
            }
        }
        return $response;
    }

}
