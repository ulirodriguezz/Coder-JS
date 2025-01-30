
let cart=[];
const productDeleteAlert = (index) =>{
    Swal.fire({
        title: '¿Estas seguro?',
        text: 'Se eliminará el producto: "'+cart[index].name+'" de tu carrito',
        icon: 'warning',
        confirmButtonText: 'Eliminar',
        cancelButtonText:'Cancelar',
        showCancelButton:true,
        preConfirm: () => {
            cart.splice(index, 1);
            renderCart(cart);
            localStorage.setItem("cartDB",JSON.stringify(cart));
        }
      });
}
function initializeCart(){
    cart = localStorage.getItem("cartDB");
    cart = JSON.parse(cart);
    let emptyCartButton = document.getElementById("empty-button");
    if(cart == null){
        cart = [];
    }
    emptyCartButton.onclick=()=>{
        Swal.fire({
            title: '¿Estas seguro?',
            text: 'Todos los productos de tu carrito seran eliminados',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            cancelButtonText:'Cancelar',
            showCancelButton:true,
          })
          .then(result => {
            if(result.isConfirmed){
                cart = [];
                localStorage.setItem("cartDB",JSON.stringify(cart));
                renderCart(cart);
            }
          })
        localStorage.setItem("cartDB",JSON.stringify(cart));

    }

}
function renderCart(cart){
    let cartContainer = document.getElementById("cart-container");
    let cartTotalPrice = document.getElementById("cart-total");
    let cartTotalPriceCount = 0;
    //Borro el carrito para actualizarlo
    if(cart.length == 0){
        cartContainer.innerHTML = "<h2>No hay productos en el carrito</h2>";
    }else{
        cartContainer.innerHTML ="";
    }
    cart.forEach(p => {
        let productCard = document.createElement("div");
        let totalProductPrice = p.quantity * p.price *(1-p.discount);
        productCard.className="cart-product-card";
        productCard.id =`porduct-card-${p.id}`;
        //Aclaración: Necesito que el ID de los botones sea unico por lo que no puedo poner directamente el ID del producto.
        productCard.innerHTML = `
        <h2>${p.name}</h1>
                <h3 id="text-quantity">Cantidad : ${p.quantity}</h3>
                <div class="cart-buttons-container">
                    <button class="minus-button" id=${"minus-"+p.id}>-</button>
                    <button class="plus-button" id=${"plus-"+p.id}>+</button>
                    <button class="delete-button" id= ${"delete-"+p.id}>
                        <i class="fas fa-trash-alt"></i> 
                    </button>
                </div>
                <h3>Total: $${totalProductPrice.toFixed(2)}</h3>
            </div>
        `
        cartTotalPriceCount += totalProductPrice;   //Poría usar el reduce para esto pero decdí aprovechar que ya tenía el foreach.
        cartContainer.appendChild(productCard);
    });
    cartTotalPrice.innerText ="Total price: $"+cartTotalPriceCount;
    addButtonEvents();
}
function addButtonEvents(){
    let minusButtons = document.querySelectorAll(".minus-button");
    let plusButtons = document.querySelectorAll(".plus-button");
    let deleteButtons = document.querySelectorAll(".delete-button");
    minusButtons.forEach(b => {
        //Seteo el evento para los botones que reducen la cantidad de unidades
        b.onclick = (e) => {
           //Tengo que usar el ID unico de cada boton por lo cual quito la parte de "minus-" para quedarme solo con el ID del producto
           let prodID = e.currentTarget.id.substring(6);
           let index = cart.findIndex(p => p.id == prodID);
           if(cart[index].quantity == 1){
            productDeleteAlert(index);
           }
           else{
            cart[index].quantity -= 1;
            renderCart(cart);
            localStorage.setItem("cartDB",JSON.stringify(cart));
           }
        }
    })
    plusButtons.forEach(b => {
        //Seteo el evento para los botones que reducen la cantidad de unidades
        b.onclick = (e) => {
           //Tengo que usar el ID unico de cada boton por lo cual quito la parte de "plus-" para quedarme solo con el ID del producto
           let prodID = e.currentTarget.id.substring(5);
           let index = cart.findIndex(p => p.id == prodID);
           cart[index].quantity += 1;         
           localStorage.setItem("cartDB",JSON.stringify(cart));
           renderCart(cart);
        }
    })
    deleteButtons.forEach(b => {
    b.onclick = (e) => {
        let prodID = e.currentTarget.id.substring(7);
        let index = cart.findIndex(p => p.id == prodID);
        productDeleteAlert(index);
    }
    })
}
initializeCart();
renderCart(cart);
