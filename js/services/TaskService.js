app.factory('TaskService',(ConfigService, $http) => {
    let service = {};

    service.getTasks = (idProject) => {
        let url = `${ConfigService.urlBase}index.php?operation=enum&type=projet_taches&idProjet=${idProject}`;
        return $http.get(url);
    }

    service.getTask = (idProject, idTask) => {
        let url = `${ConfigService.urlBase}index.php?operation=enum&type=projet_tache&idProjet=${idProject}&idTache=${idTask}`;
        return $http.get(url);
    }

    service.saveTask = request => {
        let url = `${ConfigService.urlBase}index.php?operation=create&type=tache`;
        return $http.post(url, request);
    }

    service.updateTask = request => {
        let url = `${ConfigService.urlBase}index.php?operation=update&type=tache`;
        return $http.post(url, request);
    }

    service.deleteTask = id => {
        let url = `${ConfigService.urlBase}index.php?operation=delete&type=tache&id=${id}`;
        return $http.get(url);
    }

    return service;
});
