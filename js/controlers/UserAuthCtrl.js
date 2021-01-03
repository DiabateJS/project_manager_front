app.controller("UserAuthCtrl", function($scope, ConfigService){
    $scope.message = "";
    $scope.user = {};

    $scope.auth = () => {
        var url = `${ConfigService.urlBase}index.php?operation=auth`;
        $.post(url, $scope.user, function(data){
            if (data.code === ConfigService.CODE_SUCCES){
                document.location.href=`accueil.html?user=${data.message}`;
            }else{
                $scope.message = "Echec authentification !";
            }
        }).fail(function(response){
            $scope.message = "Echec authentification !";
            console.log("Error");
            console.log(response);
        });
    }

})
