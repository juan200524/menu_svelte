<script>
    import { createEventDispatcher } from 'svelte';
    import { categories } from '../stores/stores.js';
    import { addProduct } from '../services/api.js';
  
    const dispatch = createEventDispatcher();
  
    let name = '';
    let description = '';
    let price = '';
    let category = '';
    let imageUrl = '';
  
    async function handleSubmit() {
      const newProduct = {
        title: name,
        description,
        price: parseFloat(price),
        category,
        image: imageUrl
      };
      
      const addedProduct = await addProduct(newProduct);
      dispatch('addProduct', addedProduct);
      resetForm();
    }
  
    function resetForm() {
      name = '';
      description = '';
      price = '';
      category = '';
      imageUrl = '';
    }
  
    function handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  </script>
  
  <div class="add-product-container">
    <h2>Add New Product</h2>
    <form on:submit|preventDefault={handleSubmit}>
      <div>
        <label for="name">Product Name:</label>
        <input id="name" bind:value={name} required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" bind:value={description} required></textarea>
      </div>
      <div>
        <label for="price">Price:</label>
        <input id="price" type="number" bind:value={price} min="0" step="0.01" required>
      </div>
      <div>
        <label for="category">Category:</label>
        <select id="category" bind:value={category} required>
          <option value="">Select a category</option>
          {#each $categories as cat}
            <option value={cat}>{cat}</option>
          {/each}
        </select>
      </div>
      <div>
        <label for="image">Product Image:</label>
        <input type="file" id="image" accept="image/*" on:change={handleImageUpload}>
      </div>
      {#if imageUrl}
        <div class="image-preview">
          <img src={imageUrl} alt="Product preview">
        </div>
      {/if}
      <button type="submit">Add Product</button>
    </form>
  </div>
  
  <style>
    .add-product-container {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  
    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  
    label {
      display: block;
      margin-bottom: 5px;
    }
  
    input, textarea, select {
      width: 100%;
      padding: 8px;
      font-size: 16px;
    }
  
    textarea {
      height: 100px;
    }
  
    .image-preview {
      margin-top: 10px;
    }
  
    .image-preview img {
      max-width: 200px;
      max-height: 200px;
      object-fit: cover;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  
    button {
      padding: 10px 15px;
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 16px;
    }
  
    button:hover {
      background-color: #45a049;
    }
  </style>