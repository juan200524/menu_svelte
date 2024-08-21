<script>
  import { createEventDispatcher } from 'svelte';
  import { user } from '../stores/stores.js';
  import { fetchProducts, fetchCategories, fetchProduct } from '/menu_svelte/svelte-menu/src/services/api.js';

  const dispatch = createEventDispatcher();
  let searchQuery = '';
  let showProfile = false;
  let products = [];

  const categories = [
    { name: 'Electrónicos', subcategories: ['Smartphones', 'Laptops'] },
    { name: 'Ropa', subcategories: ['Camisetas', 'Pantalones'] },
  ];

  async function handleSearch() {
    try {
      if (searchQuery.trim() === '') {
        // Si la consulta de búsqueda está vacía, obtener todos los productos
        products = await fetchProducts();
      } else {
        // Si hay una consulta de búsqueda, buscar productos individuales
        const product = await fetchProduct(searchQuery);
        products = [product];
      }
      dispatch('search', products);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  }

  function handleLogout() {
    user.set(null);
    dispatch('logout');
  }

  function toggleProfile() {
    showProfile = !showProfile;
  }
</script>

<nav>
  <div class="nav-section">
    <a href="/" class="nav-logo">Logo</a>
    <a href="/" class="nav-item">Inicio</a>
    {#each categories as category}
      <div class="dropdown">
        <button class="dropbtn">{category.name}</button>
        <div class="dropdown-content">
          {#each category.subcategories as subcategory}
            <a href="/{category.name.toLowerCase()}/{subcategory.toLowerCase()}">{subcategory}</a>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <div class="nav-section">
    <div class="search-container">
      <input type="text" bind:value={searchQuery} placeholder="Buscar..." />
      <button on:click={handleSearch}>🔍</button>
    </div>
    <button class="profile-btn" on:click={toggleProfile}>👤</button>
  </div>

  {#if showProfile}
    <div class="profile-drawer">
      <h3>Perfil de Usuario</h3>
      <p>Bienvenido, {$user ? $user.username : 'Invitado'}</p>
      {#if $user}
        <button on:click={handleLogout}>Cerrar sesión</button>
      {/if}
    </div>
  {/if}
</nav>
  
  <style>
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #4CAF50;
      color: white;
    }
  
    .nav-section {
      display: flex;
      align-items: center;
    }
  
    .nav-logo, .nav-item {
      color: white;
      text-decoration: none;
      margin-right: 1rem;
    }
  
    .dropdown {
      position: relative;
      display: inline-block;
    }
  
    .dropbtn {
      background-color: #4CAF50;
      color: white;
      padding: 10px;
      font-size: 16px;
      border: none;
      cursor: pointer;
    }
  
    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
    }
  
    .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }
  
    .dropdown:hover .dropdown-content {
      display: block;
    }
  
    .search-container {
      display: flex;
      margin-right: 1rem;
    }
  
    .search-container input {
      padding: 0.5rem;
      font-size: 1rem;
    }
  
    .search-container button {
      padding: 0.5rem;
      font-size: 1rem;
      background-color: white;
      border: none;
      cursor: pointer;
    }
  
    .profile-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: white;
    }
  
    .profile-drawer {
      position: fixed;
      top: 0;
      right: 0;
      width: 250px;
      height: 100%;
      background-color: white;
      box-shadow: -2px 0 5px rgba(0,0,0,0.1);
      padding: 1rem;
      z-index: 1000;
    }
  </style>