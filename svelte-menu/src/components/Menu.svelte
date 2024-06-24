<script>
  import { onMount } from 'svelte';

  let categories = [];
  
  onMount(async () => {
    // Aquí normalmente harías una llamada a tu API
    categories = [
      { id: 1, name: 'Electrónicos', subcategories: ['Smartphones', 'Laptops', 'Tablets'] },
      { id: 2, name: 'Ropa', subcategories: ['Hombre', 'Mujer', 'Niños'] },
      { id: 3, name: 'Hogar', subcategories: ['Muebles', 'Decoración', 'Electrodomésticos'] }
    ];
  });

  let activeCategory = null;

  function toggleCategory(id) {
    activeCategory = activeCategory === id ? null : id;
  }
</script>

<nav>
  <ul>
    <li><a href="/">Inicio</a></li>
    {#each categories as category}
      <li>
        <button on:click={() => toggleCategory(category.id)}>
          {category.name}
        </button>
        {#if activeCategory === category.id}
          <ul>
            {#each category.subcategories as subcategory}
              <li><a href={`/category/${category.id}/${subcategory.toLowerCase()}`}>{subcategory}</a></li>
            {/each}
          </ul>
        {/if}
      </li>
    {/each}
    <li><a href="/contacto">Contacto</a></li>
  </ul>
</nav>

<style>
  nav {
    background-color: #f8f8f8;
    padding: 1rem;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin-right: 1rem;
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
  }
</style>