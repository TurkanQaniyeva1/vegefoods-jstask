let menubutton = document.getElementById('menubutton');
let menu = document.querySelector(".menuu");
menubutton.addEventListener('click', () => {
    menu.classList.toggle("miniMenu");
});

let carousel = document.querySelector(".carousel");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let data = [
    {
        img: "https://preview.colorlib.com/theme/vegefoods/images/person_1.jpg",
        name: "Garreth Smith",
        position: "Marketing Manager",
        description: "Far far away, behind the word mountains, there live the blind texts."
    },
    {
        img: "https://preview.colorlib.com/theme/vegefoods/images/person_2.jpg",
        name: "Emma Johnson",
        position: "Product Designer",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        img: "https://preview.colorlib.com/theme/vegefoods/images/person_3.jpg",
        name: "Michael Brown",
        position: "Software Engineer",
        description: "A wonderful day in the programming world."
    },
    {
        img: "https://preview.colorlib.com/theme/vegefoods/images/person_4.jpg",
        name: "Sophia Lee",
        position: "UX/UI Designer",
        description: "Creating beautiful interfaces with simplicity."
    },
    {
        img: "	https://preview.colorlib.com/theme/vegefoods/images/person_2.jpg",
        name: "James Wilson",
        position: "Product Manager",
        description: "Bringing ideas to life with passion and strategy."
    }
];

let currentElement = 0;

function visible(index) {
    carousel.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        let itemIndex = (index + i) % data.length;
        carousel.innerHTML += `
        <div class="item">
            <div class="image">
                <img src="${data[itemIndex].img}" alt="">
            </div>
            <h5 class="name">${data[itemIndex].name}</h5>
            <span class="position">${data[itemIndex].position}</span>
            <p class="description">${data[itemIndex].description}</p>
        </div>
        `;
    }
}

visible(currentElement);

next.addEventListener("click", () => {
    currentElement = (currentElement + 1) % data.length;
    visible(currentElement);
});

prev.addEventListener("click", () => {
    currentElement = (currentElement - 1 + data.length) % data.length;
    visible(currentElement);
});

let page = 1;
let limit = 5;
let loading = false;

const getApi = () => {
    if (loading) return;
    loading = true;

    axios.get(`https://655f2b37879575426b44b8f7.mockapi.io/productss?page=${page}&limit=${limit}`)
        .then((response) => {
            const products = response.data;
            let productList = document.getElementById("product-list");

            products.forEach(product => {
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
                                  <i onclick="addToCart(${product.id})" class="fa-solid fa-cart-shopping"></i>
                                  <i onclick= "addwish(${product.id})" class="fa-solid fa-heart"></i>
                              </div>
                        </div>
                    </div>
                `;
                productList.innerHTML += productHtml;
            });

            if (products.length < limit) {
                document.getElementById("moreProduct").disabled = true;
            } else {
                document.getElementById("moreProduct").disabled = false;
            }

            loading = false;
        })
        .catch((error) => {
            console.error("Error fetching products: ", error);
            loading = false;
        });
};

getApi();

document.getElementById('moreProduct').addEventListener('click', () => {
    page++;
    getApi();
});
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Mehsul sebete elave olundu.');
    } else {
        alert('Bu mehsul sebeetde movcuddur.');
    }
}

function addwish(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert('favroliere elave olundu'); 
    } else {
        alert('Bu mehsul favorilerde  var.');
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


const targetDate = new Date("2024-12-31T23:59:59");

    function updateTimer() {
      const now = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = `${days}<span>Days</span>`;
        document.getElementById("hours").innerHTML = `${hours}<span>Hours</span>`;
        document.getElementById("minutes").innerHTML = `${minutes}<span>Minutes</span>`;
        document.getElementById("seconds").innerHTML = `${seconds}<span>Seconds</span>`;
      } else {

        document.getElementById("timer").innerHTML = "Countdown Completed!";
      }
    }


    setInterval(updateTimer, 1000);