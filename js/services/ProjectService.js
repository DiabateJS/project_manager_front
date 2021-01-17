app.factory('ProjectService',function(ConfigService,$http){
   let service = {};

   service.getProjects = () => {
       let url = `${ConfigService.urlBase}index.php?operation=enum&type=projets`;
       return $http.get(url);
   };

   service.getProject = (id) => {
       let url = `${ConfigService.urlBase}index.php?operation=enum&type=projet&idProjet=${id}`;
       return $http.get(url);
   }

    service.saveProject = (request) => {
       let url = `${ConfigService.urlBase}index.php?operation=create&type=projet`;
       return $http.post(url, request);
    }

    service.updateProject = (request) => {
        let url = `${ConfigService.urlBase}index.php?operation=update&type=projet`;
        return $http.post(url, request);
    }

    service.deleteProject = (id) => {
       let url = `${ConfigService.urlBase}index.php?operation=delete&type=projet&id=${id}`;
       return $http.get(url);
    }

   return service;
});
