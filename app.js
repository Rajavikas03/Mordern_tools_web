let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');
let home = document.querySelector('.home');

// Set cart to be visible by default
cart.style.right = '0';

iconCart.addEventListener('click', function(){
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
        home.style.left = 'calc(20px - 400px)'; // Adjust left position accordingly
    } else {
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
        home.style.left = '20px'; // Reset left position
    }
});

close.addEventListener('click', function (){
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
    home.style.left = '20px'; // Reset left position
});

// Rest of your JavaScript code...

let products = null;
// get data from file json
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
})

//show datas product in list 
function addDataToHTML(){
    // remove datas default from HTML
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    // add new datas
    if(products != null) // if has data
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button onclick="addCart(${product.id})">Add To Cart</button>`;

            listProductHTML.appendChild(newProduct);

        });
    }
}

//use cookie so the cart doesn't get lost on refresh page
// let listCart = [];
var cookieValue;

function checkCart(){
    cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
}
checkCart();

function addCart($idProduct){
    let productsCopy = JSON.parse(JSON.stringify(products));
    // If this product is not in the cart
    if(!listCart[$idProduct]) 
    {
        listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct].quantity = 1;
    } else {
        // If this product is already in the cart and the quantity is less than 5
        if (listCart[$idProduct].quantity < 5) {
            listCart[$idProduct].quantity++;
        } else {
            // If the quantity is already 5, display "Not Available"
            alert("This product is not available. Maximum quantity reached.");
            return; // Exit the function
        }
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHTML();
}
addCartToHTML();

function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price}/Hour</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity += product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}

function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            // Check if the current quantity is less than 5 before incrementing
            if (listCart[$idProduct].quantity < 5) {
                listCart[$idProduct].quantity++;
            }
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // If quantity <= 0 then remove product from the cart
            if (listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
    
        default:
            break;
    }
    // Save new data in cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    // Reload HTML view cart
    addCartToHTML();
}

window.addEventListener('scroll', function() {
    var homeLink = document.querySelector('.home');
    if (window.scrollY > 100) { // Adjust 100 to your desired scroll position
        homeLink.style.display = 'none';
    } else {
        homeLink.style.display = 'block';
    }
});
