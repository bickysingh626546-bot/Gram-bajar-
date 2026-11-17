// Gram Bajar - product data and search/filter logic
// Apne asli products add karne ke liye isi array mein naye objects jodiye.
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
    description: "पूजा और सजावट के लिए मिट्टी का दीया।",
    image: "https://placehold.co/600x400/e9dfcf/514333?text=Diya"
  },
  {
    name: "बाँस की टोकरी",
    category: "बाँस के सामान",
    price: 200,
    description: "हाथ से बुनी उपयोगी बाँस की टोकरी।",
    image: "https://placehold.co/600x400/e2eadf/34533d?text=Bamboo+Basket"
  },
  {
    name: "बाँस की चटाई",
    category: "बाँस के सामान",
    price: 250,
    description: "घर में उपयोग के लिए मजबूत चटाई।",
    image: "https://placehold.co/600x400/e2eadf/34533d?text=Mat"
  },
  {
    name: "हस्तनिर्मित सजावटी सामान",
    category: "हस्तनिर्मित सामान",
    price: 120,
    description: "घर की सजावट के लिए स्थानीय हस्तकला।",
    image: "https://placehold.co/600x400/f0e5d8/594534?text=Handmade"
  },
  {
    name: "लकड़ी का छोटा खिलौना",
    category: "हस्तनिर्मित सामान",
    price: 100,
    description: "हाथ से तैयार किया गया लकड़ी का खिलौना।",
    image: "https://placehold.co/600x400/eadfce/594534?text=Wooden+Toy"
  }
];

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const clearButton = document.getElementById("clearButton");
const productsContainer = document.getElementById("products");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");

function loadCategories() {
  const categories = [...new Set(products.map(product => product.category))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.name;
  image.loading = "lazy";
  image.onerror = () => {
    image.src = "https://placehold.co/600x400/f0eee9/555555?text=Gram+Bajar";
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
  price.textContent = `₹${Number(product.price).toLocaleString("en-IN")}`;

  info.append(name, description, category, price);
  card.append(image, info);
  return card;
}

function showProducts() {
  const searchText = searchInput.value.trim().toLocaleLowerCase("hi");
  const selectedCategory = categorySelect.value;

  const filteredProducts = products.filter(product => {
    const searchableText =
      `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase("hi");

    const matchesSearch = searchableText.includes(searchText);
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  productsContainer.replaceChildren();

  filteredProducts.forEach(product => {
    productsContainer.appendChild(createProductCard(product));
  });

  resultCount.textContent = `कुल सामान मिले: ${filteredProducts.length}`;
  emptyMessage.hidden = filteredProducts.length !== 0;
}

function clearSearch() {
  searchInput.value = "";
  categorySelect.value = "all";
  showProducts();
}

searchInput.addEventListener("input", showProducts);
categorySelect.addEventListener("change", showProducts);
clearButton.addEventListener("click", clearSearch);

document.getElementById("year").textContent = new Date().getFullYear();

loadCategories();
showProducts();

