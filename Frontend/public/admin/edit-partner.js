const elements = {
    inputs : document.querySelectorAll(".form-field input"),
    submit: document.querySelector(".primary-button")
}


let isFilled = {
    firstInput: false,
    secondInput: false,
    thirdInput: false
}

function buttonStatusHandler(){

    if(isFilled.firstInput && isFilled.secondInput && isFilled.thirdInput) {
        elements.submit.removeAttribute("disabled");
    } else {
        elements.submit.setAttribute("disabled","true");
    }

};

elements.inputs.forEach(input => {

    input.addEventListener("input", function(e) {

        if(input.value.length != 0) {
            switch(e.target.id) {
                case "name":
                    isFilled.firstInput = true;
                break;
                case "telephone":
                    isFilled.secondInput = true;
                break;
                case "cpf":
                    isFilled.thirdInput = true;
                break;
            }
        } else {
            switch(e.target.id) {
                case "name":
                    isFilled.firstInput = false;
                break;
                case "telephone":
                    isFilled.secondInput = false;
                break;
                case "cpf":
                    isFilled.thirdInput = false;
                break;
            }
        }
    
        buttonStatusHandler();

    });
})
