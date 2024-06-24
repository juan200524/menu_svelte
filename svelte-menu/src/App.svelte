<script>
    import { Router, Route } from "svelte-routing";
    import Navbar from './components/Navbar.svelte';
    import Home from './routes/Home.svelte';
    import Category from './routes/Category.svelte';
    import Contact from './routes/Contact.svelte';
    import AddProduct from './routes/AddProduct.svelte';
  
    export let url = "";
  </script>
  
  <Router {url}>
    <Navbar />
    
    <main class="container">
      <Route path="/" component={Home} />
      <Route path="/category/:id/:subcategory" component={Category} />
      <Route path="/contacto" component={Contact} />
      <Route path="/agregar-producto" component={AddProduct} />
    </main>
  </Router>
  
  <style>
    :global(body) {
      margin: 0;
      padding-top: 60px; /* Altura del navbar */
      font-family: Arial, sans-serif;
    }
  
    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
  </style>