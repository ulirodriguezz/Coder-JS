let cart = localStorage.getItem("cartDB");

function renderPurchase(){
    let shippingInfo = localStorage.getItem("shippingInfoArray");
    let paymentInfo = localStorage.getItem("paymentInfoArray");
    let loggedUser = localStorage.getItem("loggedUser");
    let purchasedItemsContainer = document.getElementById("purchased-items-container");
    let totalTxt = document.getElementById("total-purchase-cost-txt");
    let shippingInfoP = document.getElementById("shipping-info-txt");
    let paymentInfoP= document.getElementById("payment-info-txt");
    let totalCost = 0;
    loggedUser = JSON.parse(loggedUser);
    cart = JSON.parse(cart);
    //Busco la informacion de pago y envio en el localStorage 
    // para el usuario loggeado
    shippingInfo = JSON.parse(shippingInfo);
    shippingInfo = shippingInfo.find(element => element.username == loggedUser.username);
    paymentInfo = JSON.parse(paymentInfo);
    paymentInfo = paymentInfo.find(element => element.username == loggedUser.username);
    //Cargo los productos comprados
    for(item of cart){
        totalCost += item.price *(1-item.discount)  * item.quantity;
        let purchasedItem = document.createElement("div");
        purchasedItem.className="purchased-item";
        purchasedItem.innerHTML = `
                <img src=${item.imgURL} alt="">
                <h2>${item.name}</h2>
                <h3>$${item.price *(1-item.discount)} x${item.quantity}</h3>       
        `;
        purchasedItemsContainer.appendChild(purchasedItem);
    } 
    totalTxt.innerText = "Total: $" + totalCost;
    shippingInfoP.innerText = "A enviar a: "+ shippingInfo.address;
    paymentInfoP.innerText = "Abonado con tarjeta de crédito (Nro: "+paymentInfo.cardNumber+")";
}
function addButtonEvent(){
    let finishButton = document.getElementById("finish-purchase-button");
    finishButton.onclick = () =>{
        //Borro el carrito y vuelvo al inicio
        cart = [];
        localStorage.setItem("cartDB",JSON.stringify(cart));
        window.location.href = "../html/ecommerce.html";
    };
}
renderPurchase();
addButtonEvent();