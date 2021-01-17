app.controller("ProjetsCtrl", function($scope, ConfigService, Helper, ProjectService, UserService, TaskService){

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
        ProjectService.getProjects().then(response => {
            $scope.projects = response.data;
        },error => {
            Helper.errorCallback(error);
        });
    }

    $scope.loadUsers = () => {
        UserService.getUsers().then(response => {
            $scope.users = response.data;
        }, error => Helper.errorCallback(error));
    }

    $scope.showProject = (id) => {
        ProjectService.getProject(id).then(response => {
            $scope.project = response.data;
            $scope.project.dateDebut = new Date(response.data.dateDebut);
            $scope.project.dateFin = new Date(response.data.dateFin);
            $scope.tasks = response.data.taches;
        }, error => Helper.errorCallback(error)
        );
    }

    function createProjectRequest(){
        console.log($scope.project);
        return {
            idProjet: $scope.project.id ? $scope.project.id : "",
            libelle: $scope.project.libelle,
            etat: $scope.project.etat,
            dateDebut: $scope.project.dateDebut,
            dateFin: $scope.project.dateFin,
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
            dateDebut: $scope.task.dateDebut,
            dateFin: $scope.task.dateFin,
            description: $scope.task.description
        };
    }

    $scope.saveProject = () => {
        var request = createProjectRequest();
        console.log(request);
        if (!$scope.project.id){
            // CREATION D'UN PROJET
            ProjectService.saveProject(request).then(response => {
                if (response.data.code === ConfigService.CODE_SUCCES){
                    $scope.loadProjects();
                    $scope.clearProjectForm();
                }
            }, error => Helper.errorCallback(error));
        }else{
            //MODIFICATION D'UN PROJET
            ProjectService.updateProject(request).then(response => {
                if (response.data.code === ConfigService.CODE_SUCCES){
                    $scope.loadProjects();
                    $scope.clearProjectForm();
                }
            }, error => Helper.errorCallback(error));
        }
    }

    $scope.deleteProject = (idProject) => {
        if (window.confirm("Etes vous sur de vouloir supprimer ?")) {
            ProjectService.deleteProject(idProject).then(response => {
                console.log("Suppression Projet réussite !");
                $scope.loadProjects();
            }, error => Helper.errorCallback(error));
        }
    }

    $scope.loadTasks = (idProject) => {
        TaskService.getTasks(idProject).then(response => {
            $scope.tasks = response.data;
        }, error => Helper.errorCallback(error));
    }

    $scope.showTask = (idProject,idTask) => {
        TaskService.getTask(idProject, idTask).then(response => {
            $scope.task = response.data;
            $scope.task.dateDebut = new Date(response.data.dateDebut);
            $scope.task.dateFin = new Date(response.data.dateFin);
        }, error => Helper.errorCallback(error));
    }

    $scope.saveTask = () => {
        var idProject = $scope.project.id;
        console.log(`idProjet = ${idProject}`);
        var idTask = $scope.task.id;
        console.log(`idTask = ${idTask}`);
        var request = createTaskRequest();
        console.log("request");
        console.log(request);
        if (!idTask){
            console.log("creation tache");
            // CREATION D'UNE TACHE
            TaskService.saveTask(request).then(response => {
                if (response.data.code === ConfigService.CODE_SUCCES){
                    console.log("Création tâche réussite !");
                    $scope.loadTasks(idProject);
                    $scope.clearTaskForm();
                }
            },error => Helper.errorCallback(error));
        }else{
            //MODIFICATION D'UNE TACHE
            TaskService.updateTask(request).then(response => {
                if (response.data.code === ConfigService.CODE_SUCCES){
                    console.log("Modification tâche réussite !");
                    $scope.loadTasks(idProject);
                }
            }, error => Helper.errorCallback(error));
        }
    }

    $scope.deleteTask = (idProject, idTask) => {
        if (window.confirm("Etes vous sur de vouloir supprimer ?")) {
            TaskService.deleteTask(idTask).then(response => {
                if (response.data.code === ConfigService.CODE_SUCCES){
                    console.log("Suppression tache réussite !");
                    $scope.loadTasks(idProject);
                    $scope.clearTaskForm();
                }
            }, error => Helper.errorCallback(error));
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
