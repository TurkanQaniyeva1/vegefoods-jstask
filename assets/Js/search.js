let menubutton = document.getElementById('menubutton');
let menu = document.querySelector(".menuu");
menubutton.addEventListener('click', () => {
    menu.classList.toggle("miniMenu");
});



let container = document.querySelector(".containerProduct");

let loading = false;
async function getApi() {
    if (loading) return;
    loading = true;
    try {
        let { data } = await axios.get(`https://655f2b37879575426b44b8f7.mockapi.io/productss`);
        let loadingGif = document.getElementById("loadingGif");
        if (loadingGif) {
            loadingGif.remove();
        }
        visible(data);
    } catch (error) {
        console.log(error);
    } finally {
        loading = false;
    }
}

getApi();

let input = document.getElementById("searchInput");
input.addEventListener("input", getSearch);

async function getSearch() {
    try {
        let { data } = await axios.get(`https://655f2b37879575426b44b8f7.mockapi.io/productss`);
        let result = data.filter((item) => item.title.toLowerCase().includes(input.value.toLowerCase()));
        visible(result);
    } catch (error) {
        console.log(error);
    }
}

let abcz = document.getElementById("abcz");
let cbza = document.getElementById("cbza");
let expensive = document.getElementById("expensive");
let cheap = document.getElementById("cheap");
let def = document.getElementById("default");

abcz.addEventListener("click", alfabe);
cbza.addEventListener("click", alfabeReverse);
expensive.addEventListener("click", price);
cheap.addEventListener("click", priceReverse);
def.addEventListener("click", getSearch);

async function alfabe() {
    try {
        container.innerHTML = "";
        let { data } = await axios.get(`https://655f2b37879575426b44b8f7.mockapi.io/productss`);
        let result = data.sort((a, b) => a.title.localeCompare(b.title));
        visible(result);
    } catch (error) {
        console.log(error);
    }
}

async function alfabeReverse() {
    try {
        container.innerHTML = "";
        let { data } = await axios.get(`https://655f2b37879575426b44b8f7.mockapi.io/productss`);
        let result = data.sort((a, b) => b.title.localeCompare(a.title));
        visible(result);
    } catch (error) {
        console.log(error);
    }
}

async function price() {
    try {
        container.innerHTML = "";
        let { data } = await axios.get(`https://655f2b37879575426b44b8f7.mockapi.io/productss`);
        let result = data.sort((a, b) => b.price - a.price);
        visible(result);
    } catch (error) {
        console.log(error);
    }
}

async function priceReverse() {
    try {
        container.innerHTML = "";
        let { data } = await axios.get(`https://655f2b37879575426b44b8f7.mockapi.io/productss`);
        let result = data.sort((a, b) => a.price - b.price);
        visible(result);
    } catch (error) {
        console.log(error);
    }
}

function visible(result) {
    container.innerHTML = ""; 
    result.forEach((item) => {
        let div = document.createElement("div");
        div.classList.add("boxx");
        div.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        <p>Price: ${item.price} $</p>
              <i class="fa-solid fa-bars"></i>
              <i onclick="addToCart(${item.id})" class="fa-solid fa-cart-shopping"></i>
              <i onclick= "addwish(${item.id})" class="fa-solid fa-heart"></i>
        `;
        container.append(div);
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Mehsul sebete elave olundu');
    } else {
        alert('Bu mehsul sebetde movcuddur');
    }
}

function addwish(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert('Favorilere eleva olundu');
    } else {
        alert('Bu mehsul favorilerde var.');
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


