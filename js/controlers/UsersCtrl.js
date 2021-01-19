app.controller("UsersCtrl", function($scope, ConfigService, Helper, UserService, ProjectService){
    $scope.name = ConfigService.name;
    $scope.enterprise = ConfigService.enterprise;
    $scope.projects = [];

    $scope.users = [];
    $scope.user = {};

    $scope.userProjets = [];
    $scope.selectedProjectId = 0;

    $scope.loadUsers = () => {
        UserService.getUsers().then(response => {
            $scope.users = response.data;
        }, error => Helper.errorCallback(error));
    }

    $scope.loadProjects = () => {
        ProjectService.getProjects().then(response => {
            $scope.projects = response.data;
        }, error => Helper.errorCallback(error));
    }

    $scope.loadData = () => {
        $scope.loadUsers();
        $scope.loadProjects();
    }

    $scope.showUser = (id) => {
        UserService.getUser(id).then(response => {
            $scope.user = response.data;
        }, error => Helper.errorCallback(error));

        UserService.getUserProjects(id).then(response => {
            $scope.userProjets = response.data;
        }, error => Helper.errorCallback(error));
    }

    $scope.addUserToProject = () => {
        let affectUserRequest = {
            idProject: $scope.selectedProjectId,
            idUser: $scope.user.id
        };
        UserService.addUserToProject(affectUserRequest).then(response => {
            if (response.data.code === ConfigService.CODE_SUCCES){
                console.log("Success::Utilisateur affecté au projet !");
                $scope.showUser($scope.user.id);
            }else if (response.data.code === ConfigService.CODE_WARNING){
                console.log("Warning::Utilisateur déjà affecté au projet !");
            }
        }, error => errorCallback(error));
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
