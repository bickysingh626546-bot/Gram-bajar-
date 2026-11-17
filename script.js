 
// =====================================
// 🌿 GRAM BAJAR - SHOPPING SYSTEM
// =====================================

// अपना बिजनेस WhatsApp नंबर यहाँ डालें
// Country code 91 के साथ, बिना + के
const WHATSAPP_NUMBER = "918817221297";

// PRODUCTS
const products = [

  {
    id: 1,
    name: "मिट्टी का घड़ा",
    category: "मिट्टी के सामान",
    price: 150,
    description: "हाथ से बना पारंपरिक मिट्टी का घड़ा।",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800"
  },

  {
    id: 2,
    name: "मिट्टी का दीया",
    category: "मिट्टी के सामान",
    price: 20,
    description: "पूजा और सजावट के लिए सुंदर दीया।",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800"
  },

  {
    id: 3,
    name: "बाँस की टोकरी",
    category: "बाँस के सामान",
    price: 200,
    description: "हाथ से बनी मजबूत बाँस की टोकरी।",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800"
  },

  {
    id: 4,
    name: "बाँस की चटाई",
    category: "बाँस के सामान",
    price: 250,
    description: "घर में उपयोग के लिए हस्तनिर्मित चटाई।",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800"
  },

  {
    id: 5,
    name: "लकड़ी का खिलौना",
    category: "हस्तनिर्मित सामान",
    price: 100,
    description: "स्थानीय कारीगरों द्वारा बनाया गया खिलौना।",
    image: "https://images.unsplash.com/photo-1599623560574-39d485900c95?w=800"
  },

  {
    id: 6,
    name: "हस्तनिर्मित सजावट",
    category: "हस्तनिर्मित सामान",
    price: 120,
    description: "घर की सजावट के लिए सुंदर सामान।",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800"
  }

];

// HTML ELEMENTS
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const clearButton = document.getElementById("clearButton");
const productsContainer = document.getElementById("products");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const checkoutSection = document.getElementById("checkoutSection");
const cartSection = document.getElementById("cartSection");
const orderForm = document.getElementById("orderForm");
const backButton = document.getElementById("backButton");

let cart = [];


// CATEGORY LOAD
function loadCategories() {

  const categories = [
    ...new Set(products.map(p => p.category))
  ];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

}


// IMAGE FALLBACK
function imageError(image) {
  image.onerror = null;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
      width="600" height="400">
      <rect width="100%" height="100%" fill="#e9dfcf"/>
      <text x="50%" y="48%" text-anchor="middle"
        font-size="34" fill="#514333">Gram Bajar</text>
      <text x="50%" y="62%" text-anchor="middle"
        font-size="22" fill="#514333">Product Photo</text>
    </svg>`;

  image.src = "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(svg);
}


// PRODUCT CARD
function createProductCard(product) {

  const card = document.createElement("div");
  card.className = "product-card";

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.name;
  image.loading = "lazy";
  image.onerror = function() {
    imageError(this);
  };

  const info = document.createElement("div");
  info.className = "product-info";

  const name = document.createElement("h3");
  name.textContent = product.name;

  const description = document.createElement("p");
  description.textContent = product.description;

  const category = document.createElement("span");
  category.className = "product-category";
  category.textContent = product.category;

  const price = document.createElement("div");
  price.className = "product-price";
  price.textContent = "₹" + product.price;

  const button = document.createElement("button");
  button.className = "add-cart-btn";
  button.textContent = "🛒 Add to Cart";

  button.addEventListener("click", () => {
    addToCart(product.id);
  });

  info.append(name, description, category, price, button);
  card.append(image, info);

  return card;
}


// SHOW PRODUCTS
function showProducts() {

  const searchText = searchInput.value
    .trim().toLocaleLowerCase("hi");

  const selectedCategory = categorySelect.value;

  const filtered = products.filter(product => {

    const text = (
      product.name + " " +
      product.category + " " +
      product.description
    ).toLocaleLowerCase("hi");

    const matchSearch = text.includes(searchText);

    const matchCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  productsContainer.replaceChildren();

  filtered.forEach(product => {
    productsContainer.appendChild(createProductCard(product));
  });

  resultCount.textContent =
    "कुल सामान मिले: " + filtered.length;

  emptyMessage.hidden = filtered.length !== 0;
}


// ADD TO CART
function addToCart(id) {

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }

  updateCart();
  alert("सामान आपके Cart में जुड़ गया है।");
}


// CHANGE QUANTITY
function changeQuantity(id, amount) {

  const item = cart.find(p => p.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  updateCart();
}


// UPDATE CART
function updateCart() {

  cartItems.replaceChildren();

  if (cart.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-cart";
    message.textContent = "आपका Cart अभी खाली है।";
    cartItems.appendChild(message);
  }

  let total = 0;

  cart.forEach(item => {

    const product = products.find(p => p.id === item.id);

    if (!product) return;

    total += product.price * item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";

    const details = document.createElement("div");
    details.className = "cart-details";

    const name = document.createElement("strong");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = "₹" + product.price + " प्रति सामान";

    details.append(name, price);

    const controls = document.createElement("div");
    controls.className = "quantity-controls";

    const minus = document.createElement("button");
    minus.textContent = "−";
    minus.setAttribute("aria-label", "मात्रा कम करें");
    minus.addEventListener("click", () => {
      changeQuantity(item.id, -1);
    });

    const quantity = document.createElement("span");
    quantity.textContent = item.quantity;

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.setAttribute("aria-label", "मात्रा बढ़ाएँ");
    plus.addEventListener("click", () => {
      changeQuantity(item.id, 1);
    });

    controls.append(minus, quantity, plus);
    row.append(details, controls);

    cartItems.appendChild(row);
  });

  cartTotal.textContent = "₹" + total;
  checkoutButton.disabled = cart.length === 0;
}


// CLEAR SEARCH
function clearSearch() {

  searchInput.value = "";
  categorySelect.value = "all";

  showProducts();
}


// OPEN CHECKOUT
function openCheckout() {

  if (cart.length === 0) {
    alert("पहले Cart में सामान जोड़ें।");
    return;
  }

  cartSection.hidden = true;
  checkoutSection.hidden = false;

  checkoutSection.scrollIntoView({
    behavior: "smooth"
  });
}


// BACK TO CART
function backToCart() {

  checkoutSection.hidden = true;
  cartSection.hidden = false;

  cartSection.scrollIntoView({
    behavior: "smooth"
  });
}


// SEND ORDER TO WHATSAPP
function sendWhatsAppOrder(event) {

  event.preventDefault();

  if (!/^91[6-9][0-9]{9}$/.test(WHATSAPP_NUMBER)) {
    alert("कृपया script.js में सही बिजनेस WhatsApp नंबर डालें।");
    return;
  }

  if (cart.length === 0) {
    alert("आपका Cart खाली है।");
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();

  if (!name || !phone || !address) {
    alert("कृपया सभी जानकारी भरें।");
    return;
  }

  let total = 0;

  let message = "🌿 *GRAM BAJAR - NEW ORDER*\n\n";

  message += "👤 ग्राहक: " + name + "\n";
  message += "📱 मोबाइल: " + phone + "\n";
  message += "📍 पता: " + address + "\n\n";

  message += "*ऑर्डर की जानकारी:*\n";

  cart.forEach(item => {

    const product = products.find(p => p.id === item.id);

    if (!product) return;

    const amount = product.price * item.quantity;
    total += amount;

    message +=
      "\n" + product.name +
      "\nमात्रा: " + item.quantity +
      "\nकीमत: ₹" + amount + "\n";
  });

  message += "\n💰 *कुल कीमत: ₹" + total + "*";
  message += "\n\nकृपया ऑर्डर की पुष्टि करें।";

  const whatsappURL =
    "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message);

  window.open(whatsappURL, "_blank");

}


// INITIALIZE WEBSITE
function initializeGramBajar() {

  loadCategories();
  showProducts();
  updateCart();

  searchInput.addEventListener("input", showProducts);
  categorySelect.addEventListener("change", showProducts);
  clearButton.addEventListener("click", clearSearch);

  checkoutButton.addEventListener("click", openCheckout);
  backButton.addEventListener("click", backToCart);

  orderForm.addEventListener("submit", sendWhatsAppOrder);

}

initializeGramBajar();
