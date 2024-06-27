var url = "https://dev.vub.zone/sandbox/router.php";
var projekt = "p_psimic";
var USER = "";
var LoggedIn = false;

//------rukovanje button-a------
$("#loginBtn").click(function () {
    $("#modalBody").html(loginForm());
    $("#loginModal").modal('show');
});

$("#registerBtn").click(function () {
    $("#registerModalBody").html(registerForm());
    $("#registerModal").modal('show');
});

$("#getStartedBtn").click(function () {
    if (LoggedIn) {
        window.location.href = "./schedule.html"; 
    } else {
        alert("Please log in to get started!");
    }
});

$("#logoutBtn").click(function () {
    logout();
    updateButtonVisibility();
});

function getUser(){
    return USER;
}

function updateButtonVisibility() {
    if (LoggedIn) {
        $('#loginBtn').hide();
        $('#registerBtn').hide();
        $('#logoutBtn').show();
        $('#usernameDisplay').text(USER).show();
    } else {
        $('#loginBtn').show();
        $('#registerBtn').show();
        $('#logoutBtn').hide();
        $('#usernameDisplay').hide();
    }
}

$(function () {
    refresh();
});

function refresh() {
    $.ajax({
        type: 'POST',
        url: url,
        data: { "projekt": "p_common", 
                "procedura": "p_refresh" 
              },
        success: function (data) {
            var jsonBody = JSON.parse(data);
            if (jsonBody.h_errcode !== 999){
                USER = jsonBody.username;
                LoggedIn = true;
            }else{
                USER = "";
                LoggedIn = false;
            }  
            updateButtonVisibility();
        },
        error: function (xhr, textStatus, error) {
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        },
        async: true

    });

    console.log("Refreshing user:", USER);
}

$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    }
});