const elements = {
    input : document.querySelector("#email"),
    submit: document.querySelector("input[type='submit'][class='primary-button']")
}

let isAllInputsFilled = false;

function buttonStatusHandler(){
    if(isAllInputsFilled) {
        elements.submit.removeAttribute("disabled");
    } else {
        elements.submit.setAttribute("disabled","true");
    }
};

elements.input.addEventListener("input", function(e) {
    if(elements.input.value.length != 0) {
        isAllInputsFilled = true;
    } else {
        isAllInputsFilled = false;
    }

    buttonStatusHandler();
});

// Setting up the page minimum access level.
const pageMinimumAccessLevel = 10;

// Setting up the delay function.
function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

// Setting up the notification and redirect function.
const invalidOrExpiredToken = async () => {

    document.querySelector("#loading").style.visibility = "hidden";

    toastr.error("Faça o login novamente. Redirecionando...","Token inválido ou sessão expirada");

    await delay(3);

    window.location.href = "https://hurb-para-parceiros.herokuapp.com/login.html";

}

// Checking if the user's session still valid.
$(document).ready(function() {

    if(!localStorage.getItem("token")) {
        invalidOrExpiredToken();
    } else {

        document.querySelector("#loading").style.visibility = "visible";

        var settings = {
            "url": "https://hurb-para-parceiros.herokuapp.com/api/v1/user/is-session-token-still-valid",
            "method": "GET",
            "timeout": 0,
            "headers": {
              "Authorization": localStorage.getItem("token"),
            },
            "error": invalidOrExpiredToken,
          };
          
          $.ajax(settings).done(function (response) {
            if(response.success) {

                document.querySelector("#loading").style.visibility = "hidden";

                if(response.success.data.access_level < pageMinimumAccessLevel) {
                    invalidOrExpiredToken();
                }
                
            }
          })

    }

});


$(document).ready(function() {

    var settings = {
        "url": "https://hurb-para-parceiros.herokuapp.com/api/v1/role/",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": localStorage.getItem("token")
        },
      };
      
      $.ajax(settings).done(function (response) {
        response.success.data.forEach(role => {

            let option = document.createElement("option");
            option.textContent = role.nome;
            option.value = role.nome;

            document.querySelector("#role").appendChild(option);

        })
      });
      
      

});

// Form prevent default.
$("form").submit(function(e) {
    e.preventDefault();
});


document.querySelector(".primary-button").addEventListener("click", function() {

    document.querySelector("#loading").style.visibility = "visible";

    var settings = {
        "url": "https://hurb-para-parceiros.herokuapp.com/api/v1/user/register",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": localStorage.getItem("token"),
        },
        "data": {
          "email": document.querySelector("#email").value,
          "role": document.querySelector("#role").value,
        },
        "error": invalidOrExpiredToken,
      };
      
      $.ajax(settings).done(function (response) {
        if(response.success) {
            document.querySelector("#loading").style.visibility = "hidden";
            toastr.success(response.success.title);
        } else {
            document.querySelector("#loading").style.visibility = "hidden";
            toastr.error(response.error.detail, response.error.title);
        }
      });

})