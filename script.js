// Dynamically add "Add to Cart" buttons to all product cards
const productCards = document.querySelectorAll(".product-card");
productCards.forEach((card) => {
  if (!card.querySelector(".add-to-cart-btn")) {
    const product = card.querySelector(".whatsapp-btn")?.dataset.product || "";
    const price = card.querySelector(".whatsapp-btn")?.dataset.price || "";
    const addToCartBtn = document.createElement("button");
    addToCartBtn.className = "w-full add-to-cart-btn bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 mt-2 transition";
    addToCartBtn.dataset.product = product;
    addToCartBtn.dataset.price = price;
    addToCartBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
    card.appendChild(addToCartBtn);
  }
});

// Mobile menu toggle
document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("hidden");
  });

// Category filter
const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Update active button
    categoryButtons.forEach((btn) =>
      btn.classList.remove("active", "bg-blue-600", "text-white")
    );
    this.classList.add("active", "bg-blue-600", "text-white");

    // Filter products
    const category = this.dataset.category;
    productCards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// WhatsApp product buttons
const whatsappButtons = document.querySelectorAll(".whatsapp-btn");
const whatsappNumber = "7276768824"; // Sample number - replace with your actual number

whatsappButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const product = this.dataset.product;
    const price = this.dataset.price;
    const card = button.closest('.product-card');
    const img = card ? card.querySelector('img') : null;
    const imgUrl = img ? window.location.origin + '/' + img.getAttribute('src') : '';

    const message = `Hello Abrish Fishing, I'm interested in purchasing:\n\n*Product:* ${product}\n*Price:* ${price}\n${imgUrl ? `*Image:* ${imgUrl}\n` : ''}\nPlease let me know about availability.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  });
});

// Explore products button scroll
document.getElementById("explore-products").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("products").scrollIntoView({
    behavior: "smooth",
  });
});

// Animation on scroll
const animateElements = document.querySelectorAll(".animate-fade");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

animateElements.forEach((element) => {
  observer.observe(element);
});

// Slider functionality
const slides = document.querySelector(".slides");
const totalSlides = slides.children.length;
let currentIndex = 0;

function showNextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(showNextSlide, 3000); // Change slide every 3 seconds

// Cart functionality
const cartToggleBtn = document.getElementById("cart-toggle");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const buyNowBtn = document.getElementById("buy-now");

let cart = [];

// Toggle cart sidebar visibility
cartToggleBtn.addEventListener("click", () => {
  cartSidebar.classList.toggle("show");
});

closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("show");
});

// Add to Cart button functionality
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    const price = button.dataset.price;

    // Check if product already in cart
    const existingItem = cart.find((item) => item.product === product);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ product, price, quantity: 1 });
    }
    updateCartUI();
  });
});

function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  const cartCountBadge = document.getElementById("cart-count");
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p class='text-gray-600'>Your cart is empty.</p>";
    buyNowBtn.disabled = true;
    buyNowBtn.classList.add("opacity-50", "cursor-not-allowed");
    cartCountBadge.textContent = "0";
    cartCountBadge.style.display = "none";
    return;
  }
  buyNowBtn.disabled = false;
  buyNowBtn.classList.remove("opacity-50", "cursor-not-allowed");

  // Update cart count badge
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  cartCountBadge.textContent = totalQuantity;
  cartCountBadge.style.display = "inline-block";

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "flex justify-between items-center border-b border-gray-200 pb-2";

    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `<p class="font-medium">${item.product}</p><p class="text-sm text-gray-600">${item.price} x ${item.quantity}</p>`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "text-red-600 hover:text-red-800";
    removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
    removeBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      updateCartUI();
    });

    itemDiv.appendChild(infoDiv);
    itemDiv.appendChild(removeBtn);
    cartItemsContainer.appendChild(itemDiv);
  });
}

// Buy Now button functionality
buyNowBtn.addEventListener("click", () => {
  if (cart.length === 0) return;

  let message = "Hello Abrish Fishing, I'm interested in purchasing:\n\n";
  cart.forEach((item) => {
    message += `*Product:* ${item.product}\n*Price:* ${item.price}\n*Quantity:* ${item.quantity}\n\n`;
  });
  message += "Please let me know about availability.";

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
});
