
let productsLoaded = false;
const productAlert = () => {Swal.fire(
    {
        title: 'Perfecto!',
        text: 'El producto se agregó a tu carrito',
        icon: 'success',
        confirmButtonText: 'Aceptar',
    }
)};
let productsDB;
function startEcommerce(){
    let cartDB = localStorage.getItem("cartDB");
    let searchBar = document.getElementById("search-bar");
    cartDB = JSON.parse(cartDB);
    if(cartDB == null){
        localStorage.setItem("cartDB",JSON.stringify(cart));
    }
    searchBar.onkeyup = () => {
        if(productsLoaded){
            let filteredProducts = productsDB.filter(p => p.name.toLocaleLowerCase().includes(searchBar.value))
            renderProducts(filteredProducts);
        }
    }

}
function renderProducts(products){

    let productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";
    for(p of productsDB){
        let product = document.createElement("div");   
        product.className = "product-card";   
        product.innerHTML =`
                <h1>${p.name}</h1>
                <h3>Precio: $${p.price}</h3>
                <h3>Descuento: ${p.discount * 100}%</h3>
                <button id = ${p.id} class="product-button">Agregar</button>`;
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

fetch("../db/products.json")
    .then(response => response.json())
    .then(data => {    
    productsLoaded = true;
    productsDB = data;
    renderProducts(productsDB);
    })
startEcommerce();

    




