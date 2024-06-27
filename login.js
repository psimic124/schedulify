// login.js
function loginForm() {
    var output = "<br><br><form id='loginForm'><div class='form-group'>";
    output += "<label for='inputEmail'>Email address</label>";
    output += "<input type='email' class='form-control' id='inputEmail' aria-describedby='emailHelp' placeholder='Enter email'></div>";
    output += "<div class='form-group'><label for='inputPassword'>Password</label>";
    output += "<input type='password' class='form-control' id='inputPassword' placeholder='Password'></div>";
    output += "<button type='button' class='btn btn-primary' id='getLogin'>Submit</button></form>";
    return output;
}

$(document).on('click', '#getLogin', function() {
    login();
});

function login() {
    var email = $('#inputEmail').val();
    var password = $('#inputPassword').val();

    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    $.ajax({
        url: url,
        type: 'POST',
        data: {
            "projekt": projekt,
            "procedura": "p_login",
            "username": email,
            "password": password
        },
        success: function(data) {
            var jsonBody = JSON.parse(data);
            var errcod = jsonBody.h_errcod;
            var message = jsonBody.h_message;
            if (errcod === 0) {
                alert("Login successful.");
                LoggedIn = true;
                $('#loginModal').modal('hide');
                updateButtonVisibility();
                refresh();
            } else {
                alert("Login failed: " + message);
            }
        },
        error: function (xhr, textStatus, error) {
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        },
        async: true
    });
}

function updateButtonVisibility() {
    console.log("Updating button visibility. LoggedIn:", LoggedIn, "USER:", USER);
    if (LoggedIn) {
        $('#loginBtn').hide();
        $('#registerBtn').hide();
        $('#logoutBtn').show();
        $('#userDropdown').show();
        $('#userDropdownMenu').text(USER);
    } else {
        $('#loginBtn').show();
        $('#registerBtn').show();
        $('#logoutBtn').hide();
        $('#userDropdown').hide();
    }
}

function logout() {
    $.ajax({
        type: 'POST',
        url: url,
        data: { "projekt": "p_common", 
                "procedura": "p_logout" 
            },
        success: function (data) {
            var jsonBody = JSON.parse(data);
            var errcode = jsonBody.h_errcode;
            var message = jsonBody.h_message;

            if (message == null || message == "" || errcode == null) {
                alert("Greška u obradi podataka, molimo pokušajte ponovno!");
            } else {
                alert(message);
            }
            LoggedIn = false;
            USER = "";
            updateButtonVisibility();
        },
        error: function (xhr, textStatus, error) {
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        },
        async: true
    });
}
