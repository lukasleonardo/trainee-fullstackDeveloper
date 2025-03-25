document.getElementById('scrapeBtn').addEventListener('click', async () => {
  const keyword = document.getElementById('keyword').value.trim();
  if (!keyword) {
      alert('Please enter a keyword');
      return;
  }

  try {
      const response = await fetch(`/api/scrape?keyword=${keyword}`);
      const products = await response.json();

      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';

      products.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.classList.add('product');
          productDiv.innerHTML = `
              <img src="${product.image}" alt="${product.title}" />
              <h3>${product.title}</h3>
              <p>Rating: ${product.rating}</p>
              <p>Reviews: ${product.reviews}</p>
          `;
          resultsDiv.appendChild(productDiv);
      });
  } catch (error) {
      alert('Failed to fetch products');
  }
});
