const registeredUsers = [
    {
        username : "ulises",
        password : "admin"
    }
]
localStorage.setItem("registeredUser",JSON.stringify(registeredUsers));

let usernameField = document.getElementById("input-username");
let passawordField = document.getElementById("input-password");
let loginButton = document.getElementById("login-button")
loginButton.onclick = () => {
    let validCredentials = false;
    for(user of registeredUsers){
        if(usernameField.value == user.username && passawordField.value == user.password){
            validCredentials = true;
        }
    }
    if(validCredentials){
        window.location.href = "./ecommerce.html";
    }else{
        let errorMsg = document.getElementById("error-text-login");
        errorMsg.style.display = "block";
    }
}