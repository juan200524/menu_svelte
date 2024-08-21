<script>
  import { createEventDispatcher, onMount } from 'svelte';
  export let product;
  const dispatch = createEventDispatcher();
  let dialogElement;
  let closeButton;

  function close() {
    dialogElement.close();
  }

  function handleClose() {
    dispatch('close');
  }

  onMount(() => {
    dialogElement.showModal();
    // Enfoca el botón de cierre después de que el diálogo se haya mostrado
    setTimeout(() => closeButton.focus(), 0);
  });
</script>

<dialog
  bind:this={dialogElement}
  on:close={handleClose}
  aria-labelledby="modal-title"
>
  <div class="modal-content">
    <h2 id="modal-title">{product.title}</h2>
    <img src={product.image} alt={product.title} />
    <p>{product.description}</p>
    <p>Price: ${product.price.toFixed(2)}</p>
    <p>Category: {product.category}</p>
    <button on:click={close} bind:this={closeButton}>Close</button>
  </div>
</dialog>

<style>
  /* Los estilos permanecen iguales */
</style>