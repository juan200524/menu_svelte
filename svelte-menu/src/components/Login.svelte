<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let correo = '';  
  let clave = '';   
  let error = '';
  let showPasswordRecovery = false;
  let recoveredPassword = '';
  let messageSent = false;

  async function handleSubmit() {
    try {
      const response = await fetch('/api/login_estandar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, clave })
      });
      const result = await response.json();

      if (response.ok && result.mensaje === 'Login successful') {
        dispatch('login', { correo });
      } else {
        error = result.mensaje || 'Usuario o contraseña incorrectos';
      }
    } catch (err) {
      error = 'Error en la conexión con el servidor';
    }
  }

  function togglePasswordRecovery() {
    showPasswordRecovery = !showPasswordRecovery;
    error = '';
    recoveredPassword = '';
    messageSent = false;
  }

  async function recoverPassword() {
    try {
      const response = await fetch('/api/recover-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo })
      });
      const result = await response.json();

      if (response.ok && result.success) {
        recoveredPassword = result.newPassword;
        error = '';
        sendSMS(result.phoneNumber);  // Suponiendo que la API devuelve el número de teléfono para enviar el SMS
      } else {
        error = result.message || 'Usuario no encontrado';
        recoveredPassword = '';
      }
    } catch (err) {
      error = 'Error en la conexión con el servidor';
    }
  }

  function sendSMS(phoneNumber) {
    // Simulación de envío de SMS
    console.log(`Enviando SMS al número ${phoneNumber}: Tu nueva contraseña es ${recoveredPassword}`);
    messageSent = true;
  }
</script>

<div class="login-container">
  {#if !showPasswordRecovery}
    <h2>Login</h2>
    <form on:submit|preventDefault={handleSubmit}>
      <div>
        <label for="correo">Correo:</label>
        <input id="correo" bind:value={correo} required>
      </div>
      <div>
        <label for="clave">Contraseña:</label>
        <input id="clave" type="password" bind:value={clave} required>
      </div>
      {#if error}
        <p class="error">{error}</p>
      {/if}
      <button type="submit">Login</button>
    </form>
    <p class="forgot-password">
      <a href="#" on:click|preventDefault={togglePasswordRecovery}>¿Olvidaste tu contraseña?</a>
    </p>
  {:else}
    <h2>Recuperar Contraseña</h2>
    <form on:submit|preventDefault={recoverPassword}>
      <div>
        <label for="recovery-correo">Correo:</label>
        <input id="recovery-correo" bind:value={correo} required>
      </div>
      <button type="submit">Recuperar Contraseña</button>
    </form>
    {#if recoveredPassword}
      <p class="success">Se ha enviado un SMS con tu nueva contraseña al número registrado.</p>
    {/if}
    {#if messageSent}
      <p class="success">Mensaje SMS enviado con éxito.</p>
    {/if}
    {#if error}
      <p class="error">{error}</p>
    {/if}
    <p>
      <a href="#" on:click|preventDefault={togglePasswordRecovery}>Volver al inicio de sesión</a>
    </p>
  {/if}
</div>

<style>
  .login-container {
    max-width: 300px;
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
  input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
  }
  button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }
  button:hover {
    background-color: #45a049;
  }
  .error {
    color: red;
    margin-top: 10px;
  }
  .success {
    color: green;
    margin-top: 10px;
  }
  .forgot-password {
    margin-top: 15px;
    text-align: center;
  }
  a {
    color: #4CAF50;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
</style>
