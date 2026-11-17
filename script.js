 
// =================================
// 🌿 GRAM BAJAR - JAVASCRIPT
// =================================

// सभी Products की जानकारी
const products = [

  {
    name: "मिट्टी का घड़ा",
    category: "मिट्टी के सामान",
    price: 150,
    description: "हाथ से बना पारंपरिक मिट्टी का घड़ा।",
    image: "https://placehold.co/600x400/e9dfcf/514333?text=Matka"
  },

  {
    name: "मिट्टी का दीया",
    category: "मिट्टी के सामान",
    price: 20,
    description: "पूजा और सजावट के लिए सुंदर दीया।",
    image: "https://placehold.co/600x400/e9dfcf/514333?text=Diya"
  },

  {
    name: "बाँस की टोकरी",
    category: "बाँस के सामान",
    price: 200,
    description: "हाथ से बनी मजबूत बाँस की टोकरी।",
    image: "https://placehold.co/600x400/e2eadf/34533d?text=Basket"
  },

  {
    name: "बाँस की चटाई",
    category: "बाँस के सामान",
    price: 250,
    description: "घर में उपयोग के लिए हस्तनिर्मित चटाई।",
    image: "https://placehold.co/600x400/e2eadf/34533d?text=Chatai"
  },

  {
    name: "लकड़ी का खिलौना",
    category: "हस्तनिर्मित सामान",
    price: 100,
    description: "स्थानीय कारीगरों द्वारा बनाया गया खिलौना।",
    image: "https://placehold.co/600x400/eadfce/594534?text=Toy"
  },

  {
    name: "हस्तनिर्मित सजावट",
    category: "हस्तनिर्मित सामान",
    price: 120,
    description: "घर की सजावट के लिए सुंदर सामान।",
    image: "https://placehold.co/600x400/f0e5d8/594534?text=Handmade"
  }

];

// HTML Elements
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const clearButton = document.getElementById("clearButton");
const productsContainer = document.getElementById("products");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");


// =================================
// CATEGORY LOAD
// =================================

function loadCategories() {

  const categories = [
    ...new Set(products.map(product => product.category))
  ];

  categories.forEach(category => {

    const option = document.createElement("option");

    option.value = category;
    option.textContent = category;

    categorySelect.appendChild(option);

  });

}


// =================================
// PRODUCT CARD
// =================================

function createProductCard(product) {

  const card = document.createElement("div");
  card.className = "product-card";

  const image = document.createElement("img");

  image.src = product.image;
  image.alt = product.name;
  image.loading = "lazy";

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

  info.append(name, description, category, price);
  card.append(image, info);

  return card;

}


// =================================
// SHOW PRODUCTS
// =================================

function showProducts() {

  const searchText =
    searchInput.value.trim().toLowerCase();

  const selectedCategory =
    categorySelect.value;

  const filteredProducts = products.filter(product => {

    const productText =
      (
        product.name + " " +
        product.category + " " +
        product.description
      ).toLowerCase();

    const matchSearch =
      productText.includes(searchText);

    const matchCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchSearch && matchCategory;

  });

  productsContainer.replaceChildren();

  filteredProducts.forEach(product => {

    productsContainer.appendChild(
      createProductCard(product)
    );

  });

  resultCount.textContent =
    "कुल सामान मिले: " + filteredProducts.length;

  emptyMessage.hidden =
    filteredProducts.length !== 0;

}


// =================================
// CLEAR SEARCH
// =================================

function clearSearch() {

  searchInput.value = "";
  categorySelect.value = "all";

  showProducts();

}


// =================================
// WEBSITE START
// =================================

function initializeGramBajar() {

  loadCategories();
  showProducts();

  searchInput.addEventListener(
    "input",
    showProducts
  );

  categorySelect.addEventListener(
    "change",
    showProducts
  );

  clearButton.addEventListener(
    "click",
    clearSearch
  );

}

initializeGramBajar();
