function loadProjects(){
    var url = `${urlBase}projects`;
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
        libelle: $("#libelle_projet").val(),
        etat: $("#status_projet").val(),
        description: $("#description_projet").val()
    };
}

function saveProject() {
    var request = createRequest();
    var url=`${urlBase}project`;
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
        var url = `${urlBase}project?id=${id}`;
        $.ajax({
            url: url,
            data: request,
            type: 'PUT',
            success: function(response){
                if (response.code === CODE_SUCCES){
                    swal(PROJECT_NAME,"Modification Projet réussite !","Success");
                }
            }
        });
    }
}

function clearProjectForm(){
    $("#id_projet").val("");
    $("#libelle_projet").val("");
    $("#status_projet").val("A_FAIRE");
    $("#description_projet").val("");
    $("#table_tasks_body").html("");
    clearTaskForm();
}

function showProject(id){
    var url = `${urlBase}project?id=${id}`;
    $.get(url, function(data) {
        tasks = data.tasks;
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
        var url = `${urlBase}project?id=${id}`;
        $.ajax({
            url: url,
            type: 'DELETE',
            success: function(response){
                if (response.code === CODE_SUCCES){
                    swal(PROJECT_NAME,"Suppression Projet réussite !","Success");
                    loadProjects();
                }
            }
        });
    }
}
