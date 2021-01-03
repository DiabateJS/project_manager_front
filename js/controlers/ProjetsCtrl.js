app.controller("ProjetsCtrl", function($scope, ConfigService,$http){

    $scope.name = ConfigService.name;
    $scope.enterprise = ConfigService.enterprise;

    $scope.projects = [];
    $scope.project = {};

    $scope.tasks = [];
    $scope.task = {};

    $scope.users = [];

    $scope.load = () => {
        $scope.loadProjects();
        $scope.loadUsers();
    }

    $scope.loadProjects = () => {
        $http({
            method:'GET',
            url: `${ConfigService.urlBase}index.php?operation=enum&type=projets`
        }).then((response) => {
                $scope.projects = response.data;
            },
            (response) => {
                console.log(response);
            }
        );
    }

    $scope.loadUsers = () => {
        $http({
            method:'GET',
            url: `${ConfigService.urlBase}index.php?operation=enum&type=users`
        }).then((response) => {
                $scope.users = response.data;
            },
            (response) => {
                console.log("Erreur !");
                console.log(response);
            }
        );
    }

    $scope.showProject = (id) => {
        $http({
            method:'GET',
            url: `${ConfigService.urlBase}index.php?operation=enum&type=projet&idProjet=${id}`
        }).then((response) => {
                $scope.project = response.data;
                $scope.tasks = response.data.taches;
            },
            (response) => {
                console.log("Erreur !");
                console.log(response);
            }
        );
    }

    function createProjectRequest(){
        console.log($scope.project);
        return {
            idProjet: $scope.project.id ? $scope.project.id : "",
            libelle: $scope.project.libelle,
            etat: $scope.project.etat,
            description: $scope.project.description
        };
    }

    function createTaskRequest(){
        return {
            idTache: $scope.task.id ? $scope.task.id : "",
            idProjet: $scope.project.id,
            libelle: $scope.task.libelle,
            etat: $scope.task.etat,
            estimation: $scope.task.estimation,
            user: $scope.task.user,
            description: $scope.task.description
        };
    }

    $scope.saveProject = () => {
        var request = createProjectRequest();
        var url = `${ConfigService.urlBase}index.php?operation=create&type=projet`;
        console.log(request);
        if (!$scope.project.id){
            // CREATION D'UN PROJET
            $.post(url, request, function(data){
                if (data.code === ConfigService.CODE_SUCCES){
                    //swal(PROJECT_NAME,"Création tâche réussite !","Success");
                    $scope.loadProjects();
                    $scope.clearProjectForm();
                }
            });
        }else{
            url = `${ConfigService.urlBase}index.php?operation=update&type=projet`;
            //MODIFICATION D'UN PROJET
            $.post(url, request, function(data){
                if (data.code === ConfigService.CODE_SUCCES){
                    //swal(PROJECT_NAME,"Mise à jour du  projet réussite !","Success");
                    console.log("Mise à jour du  projet réussite !");
                    $scope.loadProjects();
                    $scope.clearProjectForm();
                }
            });
        }
    }

    $scope.deleteProject = (idProject) => {
        if (window.confirm("Etes vous sur de vouloir supprimer ?")) {
            $http({
                method: 'GET',
                url: `${ConfigService.urlBase}index.php?operation=delete&type=projet&id=${idProject}`
            }).then((response) => {
                    console.log("Suppression Projet réussite !");
                    $scope.loadProjects();
                },
                (response) => {
                    console.log("Erreur !");
                    console.log(response);
                }
            );
        }
    }

    $scope.loadTasks = (idProject) => {
        $http({
            method:'GET',
            url: `${ConfigService.urlBase}index.php?operation=enum&type=projet_taches&idProjet=${idProject}`
        }).then((response) => {
                $scope.tasks = response.data;
            },
            (response) => {
                console.log("Erreur !");
                console.log(response);
            }
        );
    }

    $scope.showTask = (idProject,idTask) => {
        $http({
            method:'GET',
            url: `${ConfigService.urlBase}index.php?operation=enum&type=projet_tache&idProjet=${idProject}&idTache=${idTask}`
        }).then((response) => {
                $scope.task = response.data;
            },
            (response) => {
                console.log("Erreur !");
                console.log(response);
            }
        );
    }

    $scope.saveTask = () => {
        var idProject = $scope.project.id;
        console.log(`idProjet = ${idProject}`);
        var idTask = $scope.task.id;
        console.log(`idTask = ${idTask}`);
        var request = createTaskRequest();
        console.log("request");
        console.log(request);
        var url = "";
        if (!idTask){
            console.log("creation tache");
            // CREATION D'UNE TACHE
            url = `${ConfigService.urlBase}index.php?operation=create&type=tache`;
            $.post(url, request, function(data){
                if (data.code === ConfigService.CODE_SUCCES){
                    //swal(PROJECT_NAME,"Création tâche réussite !","Success");
                    console.log("Création tâche réussite !");
                    $scope.loadTasks(idProject);
                    $scope.clearTaskForm();
                }
            });
        }else{
            //MODIFICATION D'UNE TACHE
            url = `${ConfigService.urlBase}index.php?operation=update&type=tache`;
            $.post(url, request, function(data){
                if (data.code === ConfigService.CODE_SUCCES){
                    //swal(PROJECT_NAME,"Modification tâche réussite !","Success");
                    console.log("Modification tâche réussite !");
                    $scope.loadTasks(idProject);
                }
            });

        }
    }

    $scope.deleteTask = (idProject, idTask) => {
        if (window.confirm("Etes vous sur de vouloir supprimer ?")) {
            var url = `${ConfigService.urlBase}index.php?operation=delete&type=tache&id=${idTask}`;
            $.get(url, function(data) {
                if (data.code === ConfigService.CODE_SUCCES){
                    //swal(PROJECT_NAME,"Suppression tache réussite !","Success");
                    console.log("Suppression tache réussite !");
                    $scope.loadTasks(idProject);
                    $scope.clearTaskForm();
                }
            });
        }
    }

    $scope.clearProjectForm = () => {
        $scope.project = {};
        $scope.clearTaskForm();
    }

    $scope.clearTaskForm = () => {
        $scope.task = {};
    }

});
