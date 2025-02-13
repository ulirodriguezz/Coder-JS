

let usernameField = document.getElementById("input-username");
let passawordField = document.getElementById("input-password");
let loginButton = document.getElementById("login-button");
let savedCarts = localStorage.getItem("savedCarts");
loginButton.onclick = () => {
    let validCredentials = false;
    fetch("./db/users.json")
    .then(response => response.json())
    .then(data => {
        let userCredentials = data.find(usr => usr.username == usernameField.value);
        if(userCredentials !== undefined){
            if(passawordField.value == userCredentials.password){
                validCredentials = true;
            }
        }
        if(validCredentials){
            let savedCarts = localStorage.getItem("savedCarts");
            let loggedUser = localStorage.getItem("loggedUser");
            let cartDB = localStorage.getItem("cartDB");
            loggedUser = JSON.parse(loggedUser);
            savedCarts = JSON.parse(savedCarts);
            cartDB = JSON.parse(cartDB);
            //Verifico si ya existe algun usuario loggeado con un carrito
            //Si existe, guardo el carrito en "savedCarts" para ese usuario
            if(loggedUser != undefined && cartDB != undefined){
                if(savedCarts == null || savedCarts == undefined){
                    savedCarts = [];
                }    
                let cartIndex = savedCarts.findIndex(c => c.username == loggedUser.username);
                if(cartIndex != -1){
                    savedCarts[cartIndex].productArray = cartDB ;
                    localStorage.setItem("savedCarts",JSON.stringify(savedCarts));
                }else{
                    savedCarts.push(
                        {
                            username : loggedUser.username,
                            productArray : cartDB
                        }
                    )
                    localStorage.setItem("savedCarts",JSON.stringify(savedCarts));
                }

            }
            //Inicio la sesión del usuario
            localStorage.setItem("loggedUser",JSON.stringify(userCredentials));
            //Chequeo si hay un carrito guardado para el usuario
            //Si existe alguno, lo guardo en "cartDB"
            if(savedCarts.some(cart => cart.username == userCredentials.username)){
                let cart = savedCarts.find(c => c.username == userCredentials.username);
                localStorage.setItem("cartDB",JSON.stringify(cart.productArray));
            }else{
                localStorage.setItem("cartDB",JSON.stringify([]));
            }
            
            window.location.href = "./html/ecommerce.html";
        }else{
            let errorMsg = document.getElementById("error-text-login");
            errorMsg.style.display = "block";
            Toastify({
                text: "Credenciales invalidas",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right,rgb(232, 67, 55),rgb(227, 89, 89))",
                },
              }).showToast();
        }
    })

}
