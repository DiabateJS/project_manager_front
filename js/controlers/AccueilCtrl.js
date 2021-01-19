app.controller("AccueilCtrl", function($scope,$rootScope, $http, Helper, ConfigService, $routeParams, UserService){
    $rootScope.currentUser = {};

    $scope.name = ConfigService.name;
    $scope.enterprise = ConfigService.enterprise;
    $scope.stat = {}

    $scope.loadData = () => {
        $http({
            method:'GET',
            url: `${ConfigService.urlBase}index.php?operation=stat`
        }).then((response) => {
                $scope.stat = response.data;
            },
            (response) => {
                console.log(response);
            }

        );

        UserService.getUser($routeParams.idUser).then(response => {
            if (response.data){
                $rootScope.currentUser = response.data;
            }
        },error => Helper.errorCallback(error));

    }


});
