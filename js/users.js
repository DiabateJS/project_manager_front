function loadUsers(){
    var url = `${urlBase}users`;
    var users_table_body = "";
    $.get(url, function(data){
        data.forEach( user => {
            users_table_body += "<tr>";
            users_table_body += "<td>"+user.id+"</td>";
            users_table_body += "<td>"+user.fullName+"</td>";
            users_table_body += "<td>"+user.login+"</td>";
            users_table_body += "<td>"+user.email+"</td>";
            users_table_body += "<td>";
            users_table_body += "<button class='btn btn-primary btn-xs' onclick='showUser("+user.id+")'><i class='fa fa-pencil'></i></button>";
            users_table_body += "<button class='btn btn-danger btn-xs' onclick='deleteUser("+user.id+")'><i class='fa fa-trash-o'></i></button>";
            users_table_body += "</td>";
            users_table_body += "</tr>";
        });
        $("#table_users_body").html(users_table_body);
    });
}

function createRequest(){
    return {
        fullname: $("#fullname_user").val(),
        login: $("#login_user").val(),
        password: $("#password_user").val(),
        email: $("#email_user").val(),
        profile: $("#profile_user").val()
    };
}

function saveUser() {
    var request = createRequest();
    var url=`${urlBase}user`;
    var id = $("#id_user").val();
    if (id === ''){
        // CREATION USER
        $.post(url, request, function(data){
            console.log(data);
            if (data.code === CODE_SUCCES){
                swal(PROJECT_NAME,"Création Utilisateur réussite !","Success");
                loadUsers();
                clearUserForm();
            }
        });
    }else{
        //MODIFICATION D'UN PROJET
        var url = `${urlBase}user?id=${id}`;
        $.ajax({
            url: url,
            data: request,
            type: 'PUT',
            success: function(response){
                if (response.code === CODE_SUCCES){
                    swal(PROJECT_NAME,"Modification Utilisateur réussite !","Success");
                }
            }
        });
    }
}

function clearUserForm(){
    $("#id_user").val("");
    $("#fullname_user").val("");
    $("#login_user").val("");
    $("#password_user").val("");
    $("#email_user").val("");
    $("#profile_user").val(SIMPLE_USER_PROFILE);
}

function showUser(id){
    var url = `${urlBase}user?id=${id}`;
    $.get(url, function(data) {
        $("#id_user").val(data.id);
        $("#fullname_user").val(data.fullName);
        $("#login_user").val(data.login);
        $("#password_user").val(data.password);
        $("#email_user").val(data.email);
        $("#profile_user").val(data.profile);
    });
}

function deleteUser(id){
    if (window.confirm("Etes vous sur de vouloir supprimer ?")){
        var url = `${urlBase}user?id=${id}`;
        $.ajax({
            url: url,
            type: 'DELETE',
            success: function(response){
                if (response.code === CODE_SUCCES){
                    swal(PROJECT_NAME,"Suppression utilisateur réussite !","Success");
                    loadUsers();
                }
            }
        });
    }
}
