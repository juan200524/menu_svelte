<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import { user, products, categories } from './stores/stores.js';
  import { fetchProducts, fetchCategories } from './services/api.js';
  import Navbar from './components/Navbar.svelte';
  import Login from './components/Login.svelte';
  import ProductList from './components/ProductList.svelte';
  import ProductModal from './components/ProductModal.svelte';
  import AddProduct from './components/AddProduct.svelte';

  let showAddProduct = false;
  let selectedProduct = null;
  let filteredProducts = [];

  onMount(async () => {
    const [productsData, categoriesData] = await Promise.all([
      fetchProducts(),
      fetchCategories()
    ]);
    products.set(productsData);
    categories.set(categoriesData);
    filteredProducts = productsData;
  });

  function handleLogin(event) {
    const { username, password } = event.detail;
    if (username === 'juan' && password === '2005') {
      user.set({ username });
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  function handleLogout() {
    user.set(null);
  }

  function handleSearch(event) {
    const query = event.detail.toLowerCase();
    filteredProducts = $products.filter(product =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }

  function openProductModal(event) {
    selectedProduct = event.detail;
  }

  function closeProductModal() {
    selectedProduct = null;
  }

  function toggleAddProduct() {
    showAddProduct = !showAddProduct;
  }

  function handleAddProduct(event) {
    products.update(currentProducts => [...currentProducts, event.detail]);
    filteredProducts = [...filteredProducts, event.detail];
    showAddProduct = false;
  }
</script>

<main>
  {#if $user}
    <Navbar on:search={handleSearch} on:logout={handleLogout} />
    <button on:click={toggleAddProduct}>Add Product</button>
    <ProductList products={filteredProducts} on:selectProduct={openProductModal} />
    {#if selectedProduct}
      <ProductModal product={selectedProduct} on:close={closeProductModal} />
    {/if}
    {#if showAddProduct}
      <AddProduct on:addProduct={handleAddProduct} />
    {/if}
  {:else}
    <Login on:login={handleLogin} />
  {/if}
</main>

<style>
  /* ... (mantén los estilos existentes) ... */
</style>