app.controller("UsersCtrl", function($scope, ConfigService,$http){
    $scope.name = ConfigService.name;
    $scope.enterprise = ConfigService.enterprise;

    $scope.users = [];
    $scope.user = {};

    $scope.loadUsers = () => {
        $http({
            method:'GET',
            url: `${ConfigService.urlBase}index.php?operation=enum&type=users`
        }).then((response) => {
                $scope.users = response.data;
            },
            (response) => {
                console.log(response);
            }
        );
    }

    $scope.showUser = (id) => {
        $http({
            method:'GET',
            url: `${ConfigService.urlBase}index.php?operation=enum&type=user&id=${id}`
        }).then((response) => {
                $scope.user = response.data;
            },
            (response) => {
                console.log(response);
            }
        );
    }

    $scope.deleteUser = (id) => {
        if (window.confirm("Etes vous sur de vouloir supprimer ?")){
            $http({
                method:'GET',
                url: `${ConfigService.urlBase}index.php?operation=delete&type=user&id=${id}`
            }).then((response) => {
                    if (response.data.code === ConfigService.CODE_SUCCES){
                        //swal(PROJECT_NAME,"Suppression utilisateur réussite !","Success");
                        console.log("Success::Suppression utilisateur réussite !");
                        $scope.loadUsers();
                    }
                    if (response.data.code === ConfigService.CODE_WARNING){
                        //swal(PROJECT_NAME,data.message,"Warning");
                        console.log(`Warning::${response.data.message}`);
                        $scope.loadUsers();
                    }
                },
                (response) => {
                    console.log(response);
                }
            );
        }
    }

    function createRequest(){
        return {
            id: $scope.user.id,
            fullname: $scope.user.fullname,
            login: $scope.user.login,
            password: $scope.user.password,
            email: $scope.user.email,
            profile: $scope.user.profile
        };
    }

    $scope.saveUser = () => {
        var request = createRequest();
        var url=`${ConfigService.urlBase}index.php?operation=create&type=user`;
        if (!$scope.user.id){
            // CREATION USER
            $.post(url, request, function(data){
                if (data.code === ConfigService.CODE_SUCCES){
                    //swal(PROJECT_NAME,"Création Utilisateur réussite !","Success");
                    console.log("Création Utilisateur réussite !");
                    $scope.loadUsers();
                    $scope.clearUserForm();
                }
            });
        }else{
            //MODIFICATION D'UN USER
            var url = `${ConfigService.urlBase}index.php?operation=update&type=user`;
            $.post(url, request, function(data){
                if (data.code === ConfigService.CODE_SUCCES){
                    //swal(PROJECT_NAME,"Modification Utilisateur réussite !","Success");
                    console.log("Modification Utilisateur réussite !");
                    $scope.loadUsers();
                }
            });
        }
    }

    $scope.clearUserForm = () => {
        $scope.user = {};
    }

})
