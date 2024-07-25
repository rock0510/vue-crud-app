import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHistory } from 'vue-router';

import EditarEmpleado from './components/pages/EditarEmpleado.vue';
import ListaEmpleados from './components/pages/ListaEmpleados.vue';
import CrearEmpleado from './components/pages/CrearEmpleado';
  
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', component: ListaEmpleados, name: 'home', },
    { path: '/create', component: CrearEmpleado, name: 'create', },
    { path: '/edit/:id', component: EditarEmpleado, name: 'edit', }
  ],
});
  
createApp(App).use(router).mount('#app');