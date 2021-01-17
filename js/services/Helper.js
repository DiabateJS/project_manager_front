app.factory('Helper',() => {
   let service = {};

    service.errorCallback = error => {
        console.log("Erreur !");
        console.log(error);
    };

   return service;
});
