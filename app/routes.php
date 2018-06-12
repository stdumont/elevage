<?php

/**
 * Routes d'authentification
 */
$app->get('/', 'HomeController:index')->setName('home');
$app->get('/login', 'AuthController:getLogin')->setName('auth.login');
$app->post('/login', 'AuthController:postLogin');
$app->get('/logout', 'AuthController:postLogout');
$app->get('/isLoggedIn', 'AuthController:isLoggedIn');
$app->get('/get-current-user', 'AuthController:getCurrentUser');

/**
 * Routes vers les paramètres
 */ 
$app->get('/api/parameter/get-application-name', 'ParameterController:getApplicationName');
$app->get('/api/parameter/get-application-version', 'ParameterController:getApplicationVersion');
$app->get('/api/parameter/get-application-creation-year', 'ParameterController:getApplicationCreationYear');
$app->get('/api/parameter/get-application-creator-name', 'ParameterController:getApplicationCreatorName');
$app->get('/api/parameter/get-application-creator-mail', 'ParameterController:getApplicationCreatorMail');

/**
 * Routes vers les clients
 */ 
$app->get('/api/client/get-all', 'ClientController:getAll');
$app->get('/api/client/get-count', 'ClientController:getCount');
$app->get('/api/client/find/{id}', 'ClientController:find');
$app->post('/api/client/insert', 'ClientController:insert');
$app->post('/api/client/update', 'ClientController:update');
$app->delete('/api/client/delete/{id}', 'ClientController:delete');

/**
 * Routes vers les pays
 */ 
$app->get('/api/pays/get-all', 'PaysController:getAll');
$app->get('/api/pays/get-count', 'PaysController:getCount');
$app->get('/api/pays/get-containing', 'PaysController:getContaining');
$app->get('/api/pays/get-reference-count/{id}', 'PaysController:getReferenceInLocaliteCount');
$app->get('/api/pays/find/{id}', 'PaysController:find');
$app->post('/api/pays/insert', 'PaysController:insert');
$app->post('/api/pays/update', 'PaysController:update');
