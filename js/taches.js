function loadTasks(idProject){
    var url = `${urlBase}tasks?id=${idProject}`;
    var code = "";
    $.get(url, function(data) {
        data.forEach(task => {
            code += "<tr>";
            code += "<td>"+task.id+"</td>";
            code += "<td>"+task.libelle+"</td>";
            code += "<td>"+task.etat+"</td>";
            code += "<td>";
            code += "<button class='btn btn-primary btn-xs' onclick='showTask("+idProject+","+task.id+")'><i class='fa fa-pencil'></i></button>";
            code += "<button class='btn btn-danger btn-xs' onclick='deleteTask("+idProject+","+task.id+")'><i class='fa fa-trash-o'></i></button>";
            code += "</td>";
            code += "</tr>";
        });
        $("#table_tasks_body").html(code);
    });
}

function showTask(idProject,idTask){
    var url = `${urlBase}task?idProject=${idProject}&idTask=${idTask}`;
    $.get(url, function(data) {
        $("#id_tache").val(data.id);
        $("#libelle_tache").val(data.libelle);
        $("#status_tache").val(data.etat);
        $("#estimation_tache").val(data.estimation);
        $("#user_tache").val(data.user);
        $("#description_tache").val(data.description);
    });
}

function deleteTask(idProject,idTask){
    if (window.confirm("Etes vous sur de vouloir supprimer ?")) {
        var url = `${urlBase}task?idProjet=${idProject}&id=${idTask}`;
        $.ajax({
            url: url,
            type: 'DELETE',
            success: function (response) {
                if (response.code === CODE_SUCCES) {
                    swal(PROJECT_NAME, "Suppression tâche réussite !", "Success");
                    loadTasks(idProject);
                    clearTaskForm();
                }
            }
        });
    }
}

function clearTaskForm(){
    $("#id_tache").val("");
    $("#libelle_tache").val("");
    $("#status_tache").val("A_FAIRE");
    $("#estimation_tache").val("");
    $("#user_tache").val("");
    $("#description_tache").val("");
}

function createTaskRequest(){
    return {
        libelle: $("#libelle_tache").val(),
        etat: $("#status_tache").val(),
        estimation: $("#estimation_tache").val(),
        user: $("#user_tache").val(),
        description: $("#description_tache").val()
    };
}

function saveTask() {
    var idProject = $("#id_projet").val();
    var idTask = $("#id_tache").val();
    var request = createTaskRequest();
    var url = "";
    if (idTask === ''){
        // CREATION D'UNE TACHE
        url = `${urlBase}task?idProjet=${idProject}`;
        $.post(url, request, function(data){
            if (data.code === CODE_SUCCES){
                swal(PROJECT_NAME,"Création tâche réussite !","Success");
                loadTasks(idProject);
                clearTaskForm();
            }
        });
    }else{
        //MODIFICATION D'UNE TACHE
        url = `${urlBase}task?idProjet=${idProject}&id=${idTask}`;
        $.ajax({
            url: url,
            data: request,
            type: 'PUT',
            success: function(response){
                if (response.code === CODE_SUCCES){
                    swal(PROJECT_NAME,"Modification tâche réussite !","Success");
                    loadTasks(idProject);
                }
            }
        });
    }
}
