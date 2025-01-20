const productsDB = [
    {
        id : 1,
        name : "Campera roja",
        price : 100,
        discount : 0.1
    },
    {
        id : 2,
        name : "Ojotas negras",
        price : 20,
        discount : 0.25
    },
    {
        id : 3,
        name : "Remera verda",
        price : 60,
        discount : 0.12
    },
    {
        id : 4,
        name : "Pantalon azul",
        price : 70,
        discount : 0.1
    },
    {
        id : 5,
        name : "Camiseta River",
        price : 200,
        discount : 0.09
    },
    {
        id : 6,
        name : "Camiseta Boca",
        price : 200,
        discount : 0.12
    },
    {
        id : 7,
        name : "Camiseta Racing",
        price : 150,
        discount : 0.18
    },
];
let cart = [];
function startEcommerce(){
    let cartDB = localStorage.getItem("cartDB");
    let searchBar = document.getElementById("search-bar");
    cartDB = JSON.parse(cartDB);
    if(cartDB == null){
        localStorage.setItem("cartDB",JSON.stringify(cart));
    }
    searchBar.onkeyup = () => {
        let filteredProducts = productsDB.filter(p => p.name.toLocaleLowerCase().includes(searchBar.value))
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
            }else{
               
                //IDEM comentario de arriba
                let index = cart.findIndex(p => p.id == prodID);
                cart[index].quantity += 1;
            }
            localStorage.setItem("cartDB",JSON.stringify(cart));
        }
        
    });
}

startEcommerce();
renderProducts(productsDB);



