app.controller("AccueilCtrl", function($scope, $http, ConfigService){
    $scope.currentUser = {
        login: "jean.diabate",
        fullname: "Jean Diabate"
    }

    $scope.name = ConfigService.name;
    $scope.enterprise = ConfigService.enterprise;
    $scope.stat = {}

    $scope.loadStatData = () => {
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
    }


});
