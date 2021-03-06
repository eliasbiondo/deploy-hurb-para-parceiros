$(document).ready(function() {
    var settings = {
        "url": "https://hurb-para-parceiros.herokuapp.com/api/v1/user/",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": localStorage.getItem("token"),
        },
    };

    document.querySelector("#loading").style.visibility = "visible";
      
    $.ajax(settings).done(function (response) {

        if (response.success) {

            const users = response.success.data;

            users.forEach(user => {
                let option = document.createElement("option");
                option.textContent = user.email;
                option.value = user.email;
                option.id = user.id;
                document.querySelector("#edit-registered-user").appendChild(option);
            })

        } else {

            toastr.error(response.error.detail, response.error.title); 

        }

        document.querySelector("#loading").style.visibility = "hidden";
        
        
    });
})

document.querySelector(".primary-button").addEventListener("click", function() {
    sessionStorage.setItem("target-edit-id", document.querySelector(`option[value='${(document.querySelector("#edit-registered-user").value)}']`).id);
    document.location.href="https://hurb-para-parceiros.herokuapp.com/admin/edit-user.html";
})