function loadTasks(idProject){
    var url = `${urlBase}index.php?operation=enum&type=projet_taches&idProjet=${idProject}`;
    console.log(url);
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
    var url = `${urlBase}index.php?operation=enum&type=projet_tache&idProjet=${idProject}&idTache=${idTask}`;
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
        var url = `${urlBase}index.php?operation=delete&type=tache&id=${idTask}`;
        $.get(url, function(data) {
            if (data.code === CODE_SUCCES){
                swal(PROJECT_NAME,"Suppression tache réussite !","Success");
                loadTasks(idProject);
                clearTaskForm();
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
        idTache: $("#id_tache").val(),
        idProjet: $("#id_projet").val(),
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
        url = `${urlBase}index.php?operation=create&type=tache`;
        $.post(url, request, function(data){
            if (data.code === CODE_SUCCES){
                swal(PROJECT_NAME,"Création tâche réussite !","Success");
                loadTasks(idProject);
                clearTaskForm();
            }
        });
    }else{
        //MODIFICATION D'UNE TACHE
        url = `${urlBase}index.php?operation=update&type=tache`;
        $.post(url, request, function(data){
            if (data.code === CODE_SUCCES){
                swal(PROJECT_NAME,"Modification tâche réussite !","Success");
                loadTasks(idProject);
            }
        });

    }
}
