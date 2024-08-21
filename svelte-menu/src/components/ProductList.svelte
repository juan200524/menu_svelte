<script>
  import { createEventDispatcher } from 'svelte';
  import { products } from '../stores/stores.js';

  const dispatch = createEventDispatcher();

  function selectProduct(product) {
    dispatch('selectProduct', product);
  }

  function handleKeydown(event, product) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectProduct(product);
    }
  }
</script>

<div class="product-grid">
  {#each $products as product (product.id)}
    <button
      class="product-card"
      on:click={() => selectProduct(product)}
      on:keydown={(event) => handleKeydown(event, product)}
    >
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>
    </button>
  {/each}
</div>

<style>
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  .product-card {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s;
    background: none;
    font: inherit;
    color: inherit;
  }

  .product-card:hover,
  .product-card:focus {
    transform: scale(1.05);
    outline: 2px solid #4CAF50;
  }

  img {
    max-width: 100%;
    height: 200px;
    object-fit: contain;
  }

  h3 {
    margin: 10px 0;
    font-size: 18px;
  }

  p {
    font-weight: bold;
    color: #4CAF50;
  }
</style>