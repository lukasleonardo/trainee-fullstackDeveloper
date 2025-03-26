async function fetchProducts () {
  const keyword = document.getElementById('keyword').value.trim();
  if (!keyword) {
      alert('Please enter a keyword');
      return;
  }
  const resultsDiv = document.getElementById("results")
  resultsDiv.innerHTML = '<div class="loading"><div class="spinner"></div></div>'

  try {
      const response = await fetch(`http://localhost:3000/api/scrape?keyword=${keyword}`);
      console.log(response);
      if(!response.ok) {
        
        throw new Error('Error searching data');
        }
      const products = await response.json();

      DisplayProducts(products);
  } catch (error) {
    console.log(error);
      alert('Failed to fetch products');
  }
};

function DisplayProducts(products){
    const resultsDiv = document.getElementById("results")
  const resultsCount = document.getElementById("results-count")
  resultsDiv.innerHTML = ""

  if (products.length === 0) {
    resultsDiv.innerHTML = `
      <div class="no-results">
        <p>No products found</p>
        <p>Try a different search term</p>
      </div>
    `
    resultsCount.textContent = "0 products found"
    return
  }

  resultsCount.textContent = `${products.length} products found`

  products.forEach((product) => {
    const productDiv = document.createElement("div")
    productDiv.classList.add("product")


    const rating = product.rating
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    let starsHTML = ""
    for (let i = 0; i < fullStars; i++) {
      starsHTML += "★"
    }
    if (hasHalfStar) {
      starsHTML += "☆"
    }

    productDiv.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.title}" />
      <div class="product-content">
        <h3>${product.title}</h3>
        <div class="product-meta">
          <div class="product-rating">
            <span class="stars">${starsHTML}</span>
            <span class="reviews">(${product.reviews} reviews)</span>
          </div>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
      </div>
    `
    resultsDiv.appendChild(productDiv)
  })
}

document.getElementById('scrapeBtn').addEventListener('click', fetchProducts);

document.getElementById("keyword").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      fetchProducts()
    }
  })
