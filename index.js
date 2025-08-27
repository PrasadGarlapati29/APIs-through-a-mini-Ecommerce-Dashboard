
//DOM Ready Event
document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("products");

  const titleInput = document.getElementById("title");
  const priceInput = document.getElementById("price");
  const descriptionInput = document.getElementById("description");
  const imageInput = document.getElementById("image");
  const categoryInput = document.getElementById("category");

  //  Render a single product card
  function renderProductCard(product) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p><b>Price:</b> Rs.${product.price}</p>
      <p>${product.category}</p>
    `;
    productContainer.appendChild(card);
  }

  // Fetch all products from API
  function fetchAllProducts() {
    fetch("https://fakestoreapi.com/products")
      .then(res => {
        return res.json();
      })
      .then(products => {
        productContainer.innerHTML = ""; // clear old cards
        products.forEach(p => renderProductCard(p));
      })
      .catch(err => {
        console.error("Fetch error:", err);
        productContainer.innerHTML = "<p>Failed to load products.</p>";
      });
  }

  // 🔹 Add product
  window.addProduct = function () {
    let title = titleInput.value.trim();
    let price = parseFloat(priceInput.value);
    let description = descriptionInput.value.trim();
    let image = imageInput.value.trim() || "https://via.placeholder.com/150";
    let category = categoryInput.value;

    if (!title || !price || !description) {
      alert("Please fill all required fields.");
      return;
    }

    let newProduct = { title, price, description, image, category };

    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to add product");
        }
        return res.json();
      })
      .then(product => {
        console.log("Product Added:", product);

        //  Append product immediately to DOM (Fake Store doesn’t persist)
        renderProductCard(product);

        // Clear form
        titleInput.value = "";
        priceInput.value = "";
        descriptionInput.value = "";
        imageInput.value = "";
        categoryInput.value = "electronics";
      })
      .catch(err => {
        console.error("Add product error:", err);
        alert("Error adding product.");
      });
  };

  // load
  fetchAllProducts();
});
