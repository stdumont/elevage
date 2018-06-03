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

// Routes vers les documents & pièces jointes
$app->get('/api/document/get-all', 'DocumentController:getAll');
$app->get('/api/document/get-count', 'DocumentController:getCount');
$app->get('/api/document/get-count-by-typedoc/{id}', 'DocumentController:getCountByTypedoc');
$app->get('/api/document/get-count-by-fournisseur/{id}', 'DocumentController:getCountByFournisseur');
$app->get('/api/document/get-count-by-client/{id}', 'DocumentController:getCountByClient');
$app->get('/api/document/get-by-criterias', 'DocumentController:getByCriterias');
$app->get('/api/document/find/{id}', 'DocumentController:find');
$app->post('/api/document/insert', 'DocumentController:insert');
$app->post('/api/document/update', 'DocumentController:update');
$app->delete('/api/document/delete/{id}', 'DocumentController:delete');
$app->post('/api/document/insertPiece', 'PieceController:insert');
$app->post('/api/document/uploadPiece', 'FichierController:upload');
$app->get('/api/document/get-fichier-by-piece/{id}', 'FichierController:getByPiece');
$app->get('/api/document/get-fichier-by-id/{id}', 'FichierController:getById');
$app->delete('/api/document/deletePiece/{id}', 'PieceController:delete');
