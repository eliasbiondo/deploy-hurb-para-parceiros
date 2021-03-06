$(document).ready(function() {

    document.querySelector("#loading").style.visibility = "visible";

    var settings = {
        "url": `https://hurb-para-parceiros.herokuapp.com/api/v1/organization/${sessionStorage.getItem("organization-id")}/orders`,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": localStorage.getItem("token"),
        },
    };
      
    $.ajax(settings).done(function (response) {
        if(response.success) {
            response.success.data.forEach(order => {
                document.querySelector("#orders-main").innerHTML += `
                
                    <!-- Partner order -->
                    <div class="order">
        
                        <!-- Order id -->
                        <span class="twenty-size-bold-text">Pedido #${order.id}</span>
        
                        <!-- Order status -->
                        <span class="sixteen-size-light-text">${order.status == 'requested' ? 'Em análise, aguarde aprovação.' : (order.status == 'approved' ? 'Pedido aprovado. Aguarde o pagamento.' : 'Pedido concluído. Pagamento realizado.')}</span>
        
                        <!-- Order progress bar -->
                        <ul class="progress-bar">
                            <li id="requested" ${(order.status == 'requested' || order.status == 'approved' || order.status == 'paid') ? "class='active'" : "class='inactive'" }>Solicitado</li>
                            <li id="approved" ${(order.status == 'approved' || order.status == 'paid') ? "class='active'" : "class='inactive'" }>Aprovado</li>
                            <li id="transferred" ${(order.status == 'paid') ? "class='active'" : "class='inactive'"}>Transferido</li>
                        </ul>
        
                        <!-- Get details button -->
                        <div id="get-details-btn">
                            <a href=${`https://hurb-para-parceiros.herokuapp.com/order-summary.html?id=${order.id}`}>
                                <img src="./arrow-right-primary-icon.svg" alt="botão azul com uma seta branca apontando para a direita">
                            </a>
                        </div>
                    </div>

                `
            })
        } else {
            toastr.error(response.error.detail, response.error.title); 
        }

        document.querySelector("#loading").style.visibility = "hidden";
    });
})