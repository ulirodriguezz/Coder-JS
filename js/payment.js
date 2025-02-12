let storedPaymentInfo = localStorage.getItem("paymentInfoArray");
let storedShippingInfo = localStorage.getItem("shippingInfoArray");
let loggedUser = localStorage.getItem("loggedUser");
let numberField = document.getElementById("card-number-input"); 
let nameField = document.getElementById("card-owner-input");
let expDateField = document.getElementById("card-exp-date");
let cvvField = document.getElementById("card-cvv-number");
let addressField = document.getElementById("address");
let addressinBetweenField = document.getElementById("address-inbetween");
let zipCodeField = document.getElementById("zip-code");
loggedUser = JSON.parse(loggedUser);
storedPaymentInfo = JSON.parse(storedPaymentInfo);
storedShippingInfo = JSON.parse(storedShippingInfo);

function errorByFieldID(fieldID){
    //Mensaje a mostrar en la notificación dependiendo del Campo invalido.
    switch(fieldID){
        case "card-number-input": return "Numero de tarjeta invalido";
        case "card-owner-input": return "Nombre invalido";
        case "card-exp-date": return "Fecha de vencimiento invalida";
        case "card-cvv-number": return "CVC invalido";
        case "address" : return "Dirección invalida";
        case "address-inbetween" : return "Entre calles invalido";
        case "zip-code":return "Codigo postal invalido";
        default: return "Desconocido";
    }
}
function addResetFieldEvent(field){
    field.onfocus = () =>{
        field.style.border = "none";
    }
}
function start(){
    addResetFieldEvent(numberField);
    addResetFieldEvent(nameField);
    addResetFieldEvent(expDateField);
    addResetFieldEvent(cvvField);
    addResetFieldEvent(addressField);
    addResetFieldEvent(addressinBetweenField);
    addResetFieldEvent(zipCodeField);
    if(storedPaymentInfo === undefined || storedPaymentInfo === null){
        storedPaymentInfo = [];
        localStorage.setItem("paymentInfoArray",JSON.stringify(storedPaymentInfo));
    }
    if(storedShippingInfo === undefined || storedShippingInfo === null){
        storedShippingInfo = [];
        localStorage.setItem("shippingInfoArray",JSON.stringify(storedShippingInfo));      
    }
    //Autocompleto los campos con la información ya registrada (En el caso de que exista)
    let existingShippingInfo = storedShippingInfo.find(element => element.username == loggedUser.username);
    let existingPaymentInfo = storedPaymentInfo.find(element => element.username == loggedUser.username);
    if(existingShippingInfo !== undefined){
        addressField.value = existingShippingInfo.address;
        addressinBetweenField.value = existingShippingInfo.addressinBetween;
        zipCodeField.value = existingShippingInfo.zipCode;
    }
    if(existingPaymentInfo !== undefined){
        numberField.value = existingPaymentInfo.cardNumber;
        nameField.value = existingPaymentInfo.cardOwnerName;
        expDateField.value = existingPaymentInfo.cardExpDate;
        cvvField.value = existingPaymentInfo.cardCvv;
    }

}
function addEvents(){
    let confirmButton = document.getElementById("confirm-payment-button");
    confirmButton.onclick = () => {
        //Chequeo que los campos no esten vacios
        if(validField(numberField) && validField(nameField) && 
        validField(expDateField) && validField(cvvField) && validField(addressField)
        && validField(addressinBetweenField) && validField(zipCodeField)){
            let paymentInfo = {
                username : loggedUser.username,
                cardNumber : numberField.value,
                cardOwnerName : nameField.value,
                cardExpDate : expDateField.value,
                cardCvv : cvvField.value,
            };
            let shippingInfo = {
                username : loggedUser.username,
                address: addressField.value,
                addressinBetween : addressinBetweenField.value,
                zipCode : zipCodeField.value
            }
            //Actualizo los datos de envío y pago
            let paymentInfoIdex = storedPaymentInfo.findIndex(element => element.username = loggedUser.username);
            
            let shippingInfoIdex = storedShippingInfo.findIndex(element => element.username = loggedUser.username);
            storedShippingInfo[shippingInfoIdex] = shippingInfo;
            if(paymentInfoIdex === -1){
                storedPaymentInfo.push(paymentInfo);
            }else{
                storedPaymentInfo[paymentInfoIdex] = paymentInfo;
            }
            if(shippingInfoIdex === -1){
                storedShippingInfo.push(shippingInfo);
            }else{
                storedShippingInfo[shippingInfoIdex] = shippingInfo;
            }
            localStorage.setItem("paymentInfoArray",JSON.stringify(storedPaymentInfo));
            localStorage.setItem("shippingInfoArray",JSON.stringify(storedShippingInfo));
            

            window.location.href = "../html/purchase.html";
        }

    }
}
function validField(field){
    //Esta validacion probablemnte deba hacerse con alguna API o libreria que chequee que la tarjeta exista
    // Para simplificar el simulador hago un chequeo manual más sencillo de los datos ingresados.
    let valid = true;
    let fieldValue = field.value;
    if(fieldValue === "" || fieldValue == undefined || fieldValue == null){
        valid = false;
    }
    if(field.id === "card-number-input" ){
        //Chequeo que la cantidad de digitos de la tarjeta sea 16 para que sea valido
        fieldValue = ""+fieldValue;
        valid = fieldValue.length === 16;
    }
    if(field.id === "card-cvv-number"){
        //Chequeo que la cantidad de digitos del CVV sea de 3 o 4 digitos
        fieldValue = ""+fieldValue;
        valid = fieldValue.length == 3 || fieldValue.length == 4;
    }

    if(valid){
        return true
    }else{
        Toastify({
            text: `${errorByFieldID(field.id)}`,
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "red",
            },
        }).showToast();

        //Marco en rojo el elemento cuyo valor no es valido
        let element = document.getElementById(field.id);
        element.style.border = "1px solid red";
        return false;
    }
}

//Ejecución
start();
addEvents();
