

let usernameField = document.getElementById("input-username");
let passawordField = document.getElementById("input-password");
let loginButton = document.getElementById("login-button");

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
            localStorage.setItem("loggedUser",JSON.stringify(userCredentials));
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
