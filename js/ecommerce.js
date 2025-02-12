let loggedName;
const productAlert = () => {
    Toastify({
        text: `El producto fue agregado al carrito`,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#655CC9;",
        },
      }).showToast();
};
let productsDB;
function startEcommerce(){
    let cartDB = localStorage.getItem("cartDB");
    let searchBar = document.getElementById("search-bar");
    cartDB = JSON.parse(cartDB);
    if(cartDB == null){
        localStorage.setItem("cartDB",JSON.stringify(cart));
    }
    searchBar.onkeyup = () => { 
        let filteredProducts = productsDB.filter(p => p.name.toLocaleLowerCase().includes(searchBar.value))
        console.log(filteredProducts);
        renderProducts(filteredProducts);
        
    }

}
function renderProducts(products){

    let productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";
    for(p of products){
        let product = document.createElement("div");   
        product.className = "product-card";   
        product.innerHTML =`
                <h1>${p.name}</h1>
                <img src=${p.imgURL} alt="Foto producto">
                <div>
                    <h3>Precio: $${p.price}</h3>
                    <h3>Descuento: ${p.discount * 100}%</h3>
                    <button id = ${p.id} class="product-button">Agregar</button>
                </div>`;
        productContainer.appendChild(product);
    }
    addButtonEvents();

    

}
function addButtonEvents(){
    cart = localStorage.getItem("cartDB");
    cart = JSON.parse(cart);
    buttons = document.querySelectorAll(".product-button");
    buttons.forEach(button => {
        button.onclick = (e) => {
            const prodID = e.currentTarget.id;
            let product = productsDB.find(p => p.id == prodID);
            //Este metodo no estaba en las clases pero como es el mismo concepto que el find/filter supuse que podemos usarlo
            if(!cart.some(p => p.id == prodID)){
                product.quantity = 1;
                cart.push(product);
                productAlert();
            }else{
               
                //IDEM comentario de arriba
                let index = cart.findIndex(p => p.id == prodID);
                cart[index].quantity += 1;
                productAlert();
            }
            localStorage.setItem("cartDB",JSON.stringify(cart));
        }
        
    });
}
//Muestro una notificación de bienvenida al ecommerce para el usuario loggeado
loggedName = localStorage.getItem("loggedUser");
loggedName = JSON.parse(loggedName).name;
Toastify({
    text: `Bienvenido, ${loggedName}!!`,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right,rgb(140, 249, 104),rgb(35, 198, 43))",
    },
  }).showToast();

//Busco los productos a la API/BD
fetch("../db/products.json")
    .then(response => response.json())
    .then(data => {    
    productsDB = data;
    renderProducts(productsDB);
    })
startEcommerce();

    




