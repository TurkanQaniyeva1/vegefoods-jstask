let menubutton = document.getElementById('menubutton');
let menu = document.querySelector(".menuu");
menubutton.addEventListener('click', () => {
    menu.classList.toggle("miniMenu");
});


function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        document.getElementById('cartItems').innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = ""; 

    const fetchProductDetails = cart.map(productId =>
        axios.get(`https://655f2b37879575426b44b8f7.mockapi.io/productss/${productId}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching product with ID ${productId}:`, error);
                return null;
            })
    );

    Promise.all(fetchProductDetails).then(products => {
        products.forEach(product => {
            if (product) {
                const productHtml = `
                    <div class="col-md-2 d-flex flex-column align-items-center boxx">
                        <div class="imgg">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <h3>${product.title}</h3>
                        <div class="text">
                              <p>${product.description}</p>
                              <span class="price">${product.price}</span>
                              <div class="icons">
                                  <i class="fa-solid fa-bars"></i>
                                  <i onclick="removeFromCart(${product.id})" class="fa-solid fa-trash"></i>
                              </div>
                        </div>
                    </div>
                `;
                cartContainer.innerHTML += productHtml;
            }
        });

        if (!products.some(product => product !== null)) {
            cartContainer.innerHTML = "<p>No products found in the cart.</p>";
        }
    });
}

displayCartItems();

function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(id => id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    displayCartItems();
}



function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Mehsul sebete elave olundu');
    } else {
        alert('Bu mehsul sebetde movcuddur.');
    }
}

function addwish(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert('Favorilere eleave olundu'); 
    } else {
        alert('Bu mehsul favorilerde movcuddur');
    }
}


document.getElementById('cartIcon').addEventListener('click', function () {
    window.location.href = 'addtocard.html';
});


document.getElementById('wishlistIcon').addEventListener('click', function () {
    window.location.href = 'wishlist.html'; 
});

document.addEventListener("DOMContentLoaded", function () {
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const itemCount = cartItems.length;
        const cartCountElement = document.getElementById("cart-count");
        cartCountElement.innerHTML = `[${itemCount}]`;
    }

    function updateWishlistCount() {
        const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
        const itemCount = wishlistItems.length;
        const wishlistCountElement = document.getElementById("wishlist-count");
        wishlistCountElement.innerHTML = `[${itemCount}]`;
    }

    updateCartCount();
    updateWishlistCount(); 
});


