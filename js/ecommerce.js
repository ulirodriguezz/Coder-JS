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
    cartDB = JSON.parse(cartDB);
    console.log("Carrito:"+cart);
    if(cartDB == null){
        console.log("Holaa");
        localStorage.setItem("cartDB",JSON.stringify(cart));
    }
}
function renderProducts(products){
    let productContainer = document.getElementById("product-container");
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
            if(!cart.some(p => p.id == prodID)){
                product.quantity = 1;
                cart.push(product);
            }else{
                //Este metodo no estaba en las clases pero como es el mismo concepto supuse que podemos usarlo
                let index = cart.findIndex(p => p.id == prodID);
                cart[index].quantity += 1;
            }
            localStorage.setItem("cartDB",JSON.stringify(cart));
        }
        
    });
}

startEcommerce();
renderProducts(productsDB);
console.log(cart);



