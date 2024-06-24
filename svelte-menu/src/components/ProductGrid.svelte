<script>
    let products = [
      { id: 1, name: 'Smartphone XYZ', price: 599.99, imageUrl: 'https://via.placeholder.com/150?text=Smartphone' },
      { id: 2, name: 'Laptop ABC', price: 999.99, imageUrl: 'https://via.placeholder.com/150?text=Laptop' },
      { id: 3, name: 'Tablet 123', price: 299.99, imageUrl: 'https://via.placeholder.com/150?text=Tablet' },
      { id: 4, name: 'Smartwatch QWE', price: 199.99, imageUrl: 'https://via.placeholder.com/150?text=Smartwatch' },
      { id: 5, name: 'Auriculares DEF', price: 79.99, imageUrl: 'https://via.placeholder.com/150?text=Auriculares' },
      { id: 6, name: 'Cámara GHI', price: 449.99, imageUrl: 'https://via.placeholder.com/150?text=Camara' },
    ];
  </script>
  
  <div class="product-grid">
    {#each products as product}
      <div class="product-card">
        <img src={product.imageUrl} alt={product.name}>
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
        <button>Añadir al carrito</button>
      </div>
    {/each}
  </div>
  
  <style>
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      padding: 20px;
    }
  
    .product-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
      background-color: white;
    }
  
    .product-card img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }
  
    .product-card h3 {
      margin: 10px 0;
      font-size: 1.1rem;
    }
  
    .product-card p {
      color: #e74c3c;
      font-weight: bold;
      margin-bottom: 10px;
    }
  
    .product-card button {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    .product-card button:hover {
      background-color: #2980b9;
    }
  </style>