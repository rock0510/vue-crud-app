<template>
  <div id="app">
    <router-view></router-view>
    <Listado></Listado>
  </div>
</template>
 
<script>
import Listado from "./components/pages/ListaEmpleados.vue"; 

export default {
  name: 'App',
  components: {
    Listado,
  },
};

</script>