app.factory('UserService',function(ConfigService,$http){
    let service = {};

    service.getUsers = () => {
        let url = `${ConfigService.urlBase}index.php?operation=enum&type=users`;
        return $http.get(url);
    }

    service.getUser = (id) => {
        let url = `${ConfigService.urlBase}index.php?operation=enum&type=user&id=${id}`;
        return $http.get(url);
    }

    service.deleteUser = (id) => {
        let url = `${ConfigService.urlBase}index.php?operation=delete&type=user&id=${id}`;
        return $http.get(url);
    }

    service.saveUser = (request) => {
        let url=`${ConfigService.urlBase}index.php?operation=create&type=user`;
        return $http.post(url, request);
    }

    service.updateUser = request => {
        let url = `${ConfigService.urlBase}index.php?operation=update&type=user`;
        return $http.post(url, request);
    }

    return service;
});
