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
 * Routes vers les chiens
 */ 
$app->get('/api/chien/get-count', 'ChienController:getCount');
$app->get('/api/chien/get-count-by-race/{race_id}', 'ChienController:getCountByRace');
$app->get('/api/chien/get-count-by-robe/{robe_id}', 'ChienController:getCountByRobe');
$app->get('/api/chien/get-count-by-client/{client_id}', 'ChienController:getCountByClient');

/**
 * Routes vers les portées
 */ 
$app->get('/api/portee/get-count', 'PorteeController:getCount');

/**
 * Routes vers les clients
 */ 
$app->get('/api/client/get-all', 'ClientController:getAll');
$app->get('/api/client/get-search-standard', 'ClientController:getSearchStandard');
$app->get('/api/client/get-search-by-dog', 'ClientController:getSearchByDog');
$app->get('/api/client/get-count', 'ClientController:getCount');
$app->get('/api/client/find/{id}', 'ClientController:find');
$app->post('/api/client/insert', 'ClientController:insert');
$app->post('/api/client/update', 'ClientController:update');
$app->delete('/api/client/delete/{id}', 'ClientController:delete');

/**
 * Routes vers l'élevage'
 */ 
$app->get('/api/elevage/first', 'ElevageController:first');
$app->post('/api/elevage/update', 'ElevageController:update');

/**
 * Routes vers les races
 */ 
$app->get('/api/race/get-all', 'RaceController:getAll');
$app->get('/api/race/get-count', 'RaceController:getCount');
$app->get('/api/race/find/{id}', 'RaceController:find');
$app->post('/api/race/insert', 'RaceController:insert');
$app->post('/api/race/update', 'RaceController:update');
$app->delete('/api/race/delete/{id}', 'RaceController:delete');

/**
 * Routes vers les robes
 */ 
$app->get('/api/robe/get-all', 'RobeController:getAll');
$app->get('/api/robe/get-count', 'RobeController:getCount');
$app->get('/api/robe/get-count-by-race/{race_id}', 'RobeController:getCountByRace');
$app->get('/api/robe/find/{id}', 'RobeController:find');
$app->post('/api/robe/insert', 'RobeController:insert');
$app->post('/api/robe/update', 'RobeController:update');
$app->delete('/api/robe/delete/{id}', 'RobeController:delete');

/**
 * Routes vers l'agenda'
 */ 
$app->get('/api/agenda/get-count', 'AgendaController:getCount');
$app->get('/api/agenda/retrieve', 'AgendaController:retrieve');
$app->post('/api/agenda/insert', 'AgendaController:insert');
$app->post('/api/agenda/update', 'AgendaController:update');
$app->post('/api/agenda/generate', 'AgendaController:generate');
$app->delete('/api/agenda/delete/{id}', 'AgendaController:delete');
