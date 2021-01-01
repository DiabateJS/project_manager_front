function loadProjects(){
    var url = `${urlBase}index.php?operation=enum&type=projets`;
    var projects_table_body = "";
    $.get(url, function(data){
        data.forEach(project => {
            projects_table_body += "<tr>";
            projects_table_body += "<td>"+project.id+"</td>";
            projects_table_body += "<td>"+project.libelle+"</td>";
            projects_table_body += "<td>"+project.etat+"</td>";
            projects_table_body += "<td>";
            projects_table_body += "<button class='btn btn-primary btn-xs' onclick='showProject("+project.id+")'><i class='fa fa-pencil'></i></button>";
            projects_table_body += "<button class='btn btn-danger btn-xs' onclick='deleteProject("+project.id+")'><i class='fa fa-trash-o'></i></button>";
            projects_table_body += "</td>";
            projects_table_body += "</tr>";
        });
        $("#table_projects_body").html(projects_table_body);
    });
}

function createRequest(){
    return {
        idProjet: $("#id_projet").val(),
        libelle: $("#libelle_projet").val(),
        etat: $("#status_projet").val(),
        description: $("#description_projet").val()
    };
}

function saveProject() {
    var request = createRequest();
    var url=`${urlBase}index.php?operation=create&type=projet`;
    var id = $("#id_projet").val();
    if (id === ''){
        // CREATION D'UN PROJET
        $.post(url, request, function(data){
            console.log(data);
            if (data.code === CODE_SUCCES){
                swal(PROJECT_NAME,"Création Projet réussite !","Success");
                loadProjects();
                clearProjectForm();
            }
        });
    }else{
        //MODIFICATION D'UN PROJET
        var url = `${urlBase}index.php?operation=update&type=projet`;
        $.post(url, request, function(data){
            console.log(data);
            if (data.code === CODE_SUCCES){
                swal(PROJECT_NAME,"Mise à jour du  projet réussite !","Success");
                loadProjects();
                clearProjectForm();
            }
        });
    }
}

function clearProjectForm(){
    $("#id_projet").val("");
    $("#libelle_projet").val("");
    $("#status_projet").val(STATUS_A_FAIRE);
    $("#description_projet").val("");
    $("#table_tasks_body").html("");
    clearTaskForm();
}

function showProject(id){
    var url = `${urlBase}index.php?operation=enum&type=projet&idProjet=${id}`;
    $.get(url, function(data) {
        tasks = data.taches;
        $("#id_projet").val(data.id);
        $("#libelle_projet").val(data.libelle);
        $("#status_projet").val(data.etat);
        $("#description_projet").val(data.description);
        var table_tasks_body = "";
        tasks.forEach(task => {
            table_tasks_body += "<tr>";
            table_tasks_body += "<td>"+task.id+"</td>";
            table_tasks_body += "<td>"+task.libelle+"</td>";
            table_tasks_body += "<td>"+task.etat+"</td>";
            table_tasks_body += "<td>";
            table_tasks_body += "<button class='btn btn-primary btn-xs' onclick='showTask("+id+","+task.id+")'><i class='fa fa-pencil'></i></button>";
            table_tasks_body += "<button class='btn btn-danger btn-xs' onclick='deleteTask("+id+","+task.id+")'><i class='fa fa-trash-o'></i></button>";
            table_tasks_body += "</td>";
            table_tasks_body += "</tr>";
        });
        $("#table_tasks_body").html(table_tasks_body);
    });
    //chargement des tâches du projet

}

function deleteProject(id){
    if (window.confirm("Etes vous sur de vouloir supprimer ?")){
        var url = `${urlBase}index.php?operation=delete&type=projet&id=${id}`;
        $.get(url, function(data) {
            if (data.code === CODE_SUCCES){
                swal(PROJECT_NAME,"Suppression Projet réussite !","Success");
                loadProjects();
            }
            if (data.code === CODE_WARNING){
                swal(PROJECT_NAME,data.message,"Warning");
            }
        });
    }
}
