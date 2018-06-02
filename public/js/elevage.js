var elevageApp = angular.module('elevageApp', ['ngRoute', 'ngTable', 'angularFileUpload']);
elevageApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);