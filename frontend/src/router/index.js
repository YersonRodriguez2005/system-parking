import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import Vehiculos from '../components/Vehiculos.vue';
import Reportes from '../components/Reportes.vue'; // Importa tu componente de Reportes

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
  return localStorage.getItem("token") !== null;
}

const routes = [
  // Ruta pública de Login
  { path: '/', component: Login },
  { path: '/login', component: Login },
  
  // Ruta protegida de Dashboard (requiere autenticación)
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next('/login'); // Redirige al login si no está autenticado
      }
    }
  },
  
  // Ruta protegida de Vehículos (requiere autenticación)
  {
    path: '/vehiculos',
    component: Vehiculos,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next('/login'); // Redirige al login si no está autenticado
      }
    }
  },
  
  // Ruta protegida para el componente de Reportes
  {
    path: '/reportes',
    component: Reportes,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next('/login');
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
