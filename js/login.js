

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
            window.location.href = "./html/ecommerce.html";
        }else{
            let errorMsg = document.getElementById("error-text-login");
            errorMsg.style.display = "block";
        }
    })

}
