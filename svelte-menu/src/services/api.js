const API_URL = 'https://fakestoreapi.com';

export async function fetchProducts() {
  const response = await fetch(`${API_URL}/products`);
  return await response.json();
}

export async function fetchCategories() {
  const response = await fetch(`${API_URL}/products/categories`);
  return await response.json();
}

export async function fetchProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  return await response.json();
}

export async function addProduct(product) {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return await response.json();
}