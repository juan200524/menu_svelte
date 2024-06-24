<script>
  import { Link } from "svelte-routing";
  
  let categories = [
    { id: 1, name: 'Electrónicos', subcategories: ['Smartphones', 'Laptops', 'Tablets'] },
    { id: 2, name: 'Ropa', subcategories: ['Hombre', 'Mujer', 'Niños'] },
    { id: 3, name: 'Hogar', subcategories: ['Muebles', 'Decoración', 'Electrodomésticos'] }
  ];

  let activeCategory = null;
  let showUserMenu = false;
  let searchQuery = '';

  function toggleCategory(id) {
    activeCategory = activeCategory === id ? null : id;
  }

  function toggleUserMenu() {
    showUserMenu = !showUserMenu;
  }

  function logout() {
    console.log('Cerrando sesión...');
    showUserMenu = false;
  }

  function search() {
    console.log('Buscando:', searchQuery);
  }
</script>

<nav>
  <div class="container">
    <div class="logo">
      <img src="/path/to/your/logo.png" alt="Logo de la tienda" />
    </div>
    <ul class="main-menu">
      <li><Link to="/">Inicio</Link></li>
      {#each categories as category}
        <li>
          <button on:click={() => toggleCategory(category.id)}>
            {category.name}
          </button>
          {#if activeCategory === category.id}
            <ul class="submenu">
              {#each category.subcategories as subcategory}
                <li>
                  <Link to={`/category/${category.id}/${subcategory.toLowerCase()}`}>
                    {subcategory}
                  </Link>
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
      <li><Link to="/contacto">Contacto</Link></li> 
      <li><Link to="/agregar-producto">Agregar Producto</Link></li>
    </ul>
    <div class="search-bar">
      <input type="text" bind:value={searchQuery} placeholder="Buscar productos...">
      <button on:click={search}>🔍</button>
    </div>
    <div class="user-cart">
      <button class="cart-button">🛒</button>
      <button class="user-button" on:click={toggleUserMenu}>👤</button>
      {#if showUserMenu}
        <ul class="user-menu">
          <li><Link to="/perfil">Mi Perfil</Link></li>
          <li><Link to="/pedidos">Mis Pedidos</Link></li>
          <li><button on:click={logout}>Cerrar Sesión</button></li>
        </ul>
      {/if}
    </div>
  </div>
</nav>

<style>
  nav {
    background-color: #2c3e50;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
  }

  .logo img {
    height: 40px;
    margin-right: 20px;
  }

  .main-menu {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  .main-menu li {
    position: relative;
  }

  .main-menu a, .main-menu button {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    display: block;
    font-size: 0.9rem;
  }

  .main-menu button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .submenu {
    position: absolute;
    background-color: #34495e;
    display: none;
    flex-direction: column;
    min-width: 150px;
  }

  .main-menu li:hover .submenu {
    display: flex;
  }

  .search-bar {
    display: flex;
    align-items: center;
  }

  .search-bar input {
    padding: 0.5rem;
    border: none;
    border-radius: 4px 0 0 4px;
  }

  .search-bar button {
    padding: 0.5rem;
    background-color: #3498db;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 0 4px 4px 0;
  }

  .user-cart {
    display: flex;
    align-items: center;
  }

  .cart-button, .user-button {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: 1rem;
  }

  .user-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #34495e;
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    min-width: 150px;
  }

  .user-menu a, .user-menu button {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    display: block;
    text-align: left;
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
  }

  .user-menu a:hover, .user-menu button:hover {
    background-color: #2c3e50;
  }
</style>