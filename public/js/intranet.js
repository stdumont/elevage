var intranetApp = angular.module('intranetApp', ['ngRoute', 'ngTable', 'angularFileUpload']);
intranetApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);