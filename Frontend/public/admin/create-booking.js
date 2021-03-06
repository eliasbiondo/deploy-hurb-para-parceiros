const elements = {
    inputs : document.querySelectorAll(".form-field input"),
    submit: document.querySelector("input[type='submit'][class='primary-button']")
}

let isFilled = {
    firstInput: false,
    secondInput: false,
}

function buttonStatusHandler(){

    if(isFilled.firstInput && isFilled.secondInput) {
        elements.submit.removeAttribute("disabled");
    } else {
        elements.submit.setAttribute("disabled","true");
    }

};

elements.inputs.forEach(input => {

    input.addEventListener("input", function(e) {

        if(input.value.length != 0) {
            switch(e.target.id) {
                case "cod":
                    isFilled.firstInput = true;
                break;
                case "value":
                    isFilled.secondInput = true;
                break;
            }
        } else {
            switch(e.target.id) {
                case "cod":
                    isFilled.firstInput = false;
                break;
                case "value":
                    isFilled.secondInput = false;
                break;
            }
        }
    
        buttonStatusHandler();

    });
})

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

let organizations = [];

$(document).ready(function() {
    var settings = {
        "url": "https://hurb-para-parceiros.herokuapp.com/api/v1/organization/",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": localStorage.getItem("token"),
        },
      };
      
      $.ajax(settings).done(function (response) {
        response.success.data.forEach(organization => {

            organizations.push(organization);

            let option = document.createElement("option");
            option.textContent = `${organization.nome} - ${organization.cnpj}`;
            option.id = organization.id;
            option.value = `${organization.nome} - ${organization.cnpj}`;

            document.querySelector("#responsible-organization").appendChild(option);

        })
      });
})

// Form prevent default.
$("form").submit(function(e) {
    e.preventDefault();
});

document.querySelector(".primary-button").addEventListener("click", function() {

    document.querySelector("#loading").style.visibility = "visible";

    var settings = {
        "url": "https://hurb-para-parceiros.herokuapp.com/api/v1/reservation/create",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": localStorage.getItem("token"),
        },
        "data": {
            organization_id: document.querySelector(`option[value='${(document.querySelector("#responsible-organization").value)}']`).id,
            code: document.querySelector("#cod").value,
            value: parseFloat(document.querySelector("#value").value),
        },
      };
      
      
      $.ajax(settings).done(function (response) {

        document.querySelector("#loading").style.visibility = "hidden";
          
        if(response.success){
            toastr.success(response.success.title);
        } else  {
            toastr.error(response.error.detail, response.error.title); 
        }

      });

})