const registeredUsers = [
    {
        username : "ulises",
        password : "admin"
    }
]
localStorage.setItem("registeredUsers",JSON.stringify(registeredUsers));

let usernameField = document.getElementById("input-username");
let passawordField = document.getElementById("input-password");
let loginButton = document.getElementById("login-button")
loginButton.onclick = () => {
    let validCredentials = false;
    let users = localStorage.getItem("registeredUsers");
    users = JSON.parse(users);
    for(user of users){
        if(usernameField.value == user.username && passawordField.value == user.password){
            validCredentials = true;
        }
    }
    if(validCredentials){
        window.location.href = "./html/ecommerce.html";
    }else{
        let errorMsg = document.getElementById("error-text-login");
        errorMsg.style.display = "block";
    }
}