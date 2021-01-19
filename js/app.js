var app = angular.module("app",['ngRoute']);
app.config(['$routeProvider', function config($routeProvider){
    $routeProvider.
        when('/home/:idUser',{
            templateUrl: 'views/home.html',
            controller: 'AccueilCtrl'
        }).
        when('/projects/:idUser',{
            templateUrl: 'views/projects.html',
            controller: 'ProjetsCtrl'
        }).
        when('/users',{
            templateUrl: 'views/users.html',
            controller: 'UsersCtrl'
        }).
        otherwise('/home');
}]);

