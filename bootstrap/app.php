<?php

session_start();

require __DIR__ . '/../vendor/autoload.php';

$dotenv = new Dotenv\Dotenv(__DIR__ . '/../');
$dotenv->load();

$app = new \Slim\App([
    'settings' => [
        'displayErrorDetails' => getenv('DISPLAY_ERROR_DETAILS'),
        'db' => [
            'driver' => getenv('DB_DRIVER'),
            'host' => getenv('DB_HOST'),
            'database' => getenv('DB_DATABASE'),
            'username' => getenv('DB_USER_NAME'),
            'password' => getenv('DB_USER_PASS'),
            'charset' => getenv('DB_CHARSET'),
            'collation' => getenv('DB_COLLATION'),
            'prefix' => ''
        ]
    ]
        ]);

$container = $app->getContainer();

$capsule = new \Illuminate\Database\Capsule\Manager;
$capsule->addConnection($container['settings']['db']);
$capsule->setAsGlobal();
$capsule->bootEloquent();

$container['db'] = function($container) use ($capsule) {
    return $capsule;
};

$container['flash'] = function($container){
    return new \Slim\Flash\Messages;
};

$container['view'] = function($container) {
    $view = new \Slim\Views\Twig(
            __DIR__ . '/../resources/views', [
        'cache' => false
            ]
    );
    $view->addExtension(
            new \Slim\Views\TwigExtension($container->router, $container->request->getUri())
    );

    $view->getEnvironment()->addGlobal('flash', $container->flash);

    return $view;
};

$container['logger'] = function ($container) {

    $logger = new \Monolog\Logger('elevage_logger');
    $file_handler = new \Monolog\Handler\StreamHandler(__DIR__ . '/../logs/app.log');
    $logger->pushHandler($file_handler);
    return $logger;
};

$container['validator'] = function($container) {
    return new App\Validation\Validator();
};

$container['HomeController'] = function($container) {
    return new \App\Controllers\HomeController($container);
};
$container['AuthController'] = function($container) {
    return new \App\Controllers\AuthController($container);
};
$container['ParameterController'] = function($container) {
    return new \App\Controllers\ParameterController($container);
};
$container['ClientController'] = function($container) {
    return new \App\Controllers\ClientController($container);
};
$container['PaysController'] = function($container) {
    return new \App\Controllers\PaysController($container);
};

$container['auth'] = function($container){
    return new \App\Auth\Auth;
};

$app->add(new App\Middleware\ValidationErrorsMiddleware($container));
$app->add(new App\Middleware\OldInputMiddleware($container));
$app->add(new App\Middleware\IsLoggedInMiddleware($container));

require __DIR__ . '/../app/routes.php';
