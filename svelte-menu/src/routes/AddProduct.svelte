<script>
  let name = '';
  let description = '';
  let price = '';
  let category = '';
  let imageUrl = '';

  function handleSubmit() {
    console.log('Producto a agregar:', { name, description, price, category, imageUrl });
    
    // Limpia el formulario después de enviar
    name = '';
    description = '';
    price = '';
    category = '';
    imageUrl = '';

    alert('Producto agregado con éxito!');
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

<h1>Agregar Nuevo Producto</h1>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="name">Nombre del Producto:</label>
    <input id="name" bind:value={name} required>
  </div>

  <div>
    <label for="description">Descripción:</label>
    <textarea id="description" bind:value={description} required></textarea>
  </div>

  <div>
    <label for="price">Precio:</label>
    <input id="price" type="number" bind:value={price} min="0" step="0.01" required>
  </div>

  <div>
    <label for="category">Categoría:</label>
    <select id="category" bind:value={category} required>
      <option value="">Selecciona una categoría</option>
      <option value="electronicos">Electrónicos</option>
      <option value="ropa">Ropa</option>
      <option value="hogar">Hogar</option>
    </select>
  </div>

  <div>
    <label for="image">Imagen del Producto:</label>
    <input type="file" id="image" accept="image/*" on:change={handleImageUpload}>
  </div>

  {#if imageUrl}
    <div class="image-preview">
      <img src={imageUrl} alt="Vista previa del producto">
    </div>
  {/if}

  <button type="submit">Agregar Producto</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 0.5rem;
  }

  input, textarea, select {
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background-color: #45a049;
  }

  .image-preview {
    margin-top: 1rem;
  }

  .image-preview img {
    max-width: 200px;
    max-height: 200px;
    object-fit: cover;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
</style>