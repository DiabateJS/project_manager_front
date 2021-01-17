app.controller("UsersCtrl", function($scope, ConfigService, Helper, UserService){
    $scope.name = ConfigService.name;
    $scope.enterprise = ConfigService.enterprise;

    $scope.users = [];
    $scope.user = {};

    $scope.loadUsers = () => {
        UserService.getUsers().then(response => {
            $scope.users = response.data;
        }, error => Helper.errorCallback(error));
    }

    $scope.showUser = (id) => {
        UserService.getUser(id).then(response => {
            $scope.user = response.data;
        }, error => Helper.errorCallback(error));
    }

    $scope.deleteUser = (id) => {
        if (window.confirm("Etes vous sur de vouloir supprimer ?")){
            UserService.deleteUser(id).then(response => {
                if (response.data.code === ConfigService.CODE_SUCCES){
                    console.log("Success::Suppression utilisateur réussite !");
                    $scope.loadUsers();
                }
                if (response.data.code === ConfigService.CODE_WARNING){
                    console.log(`Warning::${response.data.message}`);
                    $scope.loadUsers();
                }
            }, error => Helper.errorCallback(error));
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
        if (!$scope.user.id){
            // CREATION USER
            UserService.saveUser(request).then(response => {
                if (response.data.code === ConfigService.CODE_SUCCES){
                    console.log("Création Utilisateur réussite !");
                    $scope.loadUsers();
                    $scope.clearUserForm();
                }
            }, error => Helper.errorCallback(error));
        }else{
            //MODIFICATION D'UN USER
            UserService.updateUser(request).then(response => {
                if (response.data.code === ConfigService.CODE_SUCCES){
                    console.log("Modification Utilisateur réussite !");
                    $scope.loadUsers();
                }
            }, error => Helper.errorCallback(error));
        }
    }

    $scope.clearUserForm = () => {
        $scope.user = {};
    }

})
