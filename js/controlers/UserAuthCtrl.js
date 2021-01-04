app.controller("UserAuthCtrl", function($scope, $http, ConfigService){
    $scope.message = "";
    $scope.user = {};
    $scope.message_createuser = "";
    $scope.newuser = {};
    $scope.canCreateUser = false;

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

    $scope.clearNewUserForm = () => {

    }

    $scope.SaveNewUser = () => {
        $http({
            method:'GET',
            url: `${ConfigService.urlBase}index.php?operation=enum&type=users`
        }).then((response) => {
                if(response.data){
                    var usersWithLogin = response.data.filter(user => user.login == $scope.newuser.login);
                    if (usersWithLogin.length == 0){
                        $scope.canCreateUser = true;
                    }else{
                        $scope.message_createuser = "Ce login existe en base";
                    }
                }
            },
            (response) => {
                console.log(response);
            }
        );
    }

    function createUserRequest(){
        return {
            fullname: $scope.newuser.fullname,
            login: $scope.newuser.login,
            password: $scope.newuser.password,
            email: $scope.newuser.email,
            profile: ConfigService.SIMPLE_USER_PROFILE
        }
    }

    $scope.$watch('canCreateUser',function(canCreate){
        if (canCreate){
            var url = `${ConfigService.urlBase}index.php?operation=create&type=user`;
            var request = createUserRequest();
            $.post(url, request, function(data){
                if (data.code === ConfigService.CODE_SUCCES){
                    $scope.message_createuser = "Compte créer avec succes";
                }
            });
        }
    });

})
