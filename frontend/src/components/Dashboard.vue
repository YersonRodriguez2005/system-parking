<template>
  <div class="dashboard">
    <h1><i class="fas fa-tachometer-alt"></i> Bienvenido al Dashboard</h1>
    <p>Contenido de la página protegida</p>
    
    <!-- Botones de navegación -->
    <router-link to="/vehiculos">
      <button class="btn-primary">
        <i class="fas fa-car"></i> Ir a Gestión de Vehículos
      </button>
    </router-link>
    
    <!-- Nuevo botón para reportes -->
    <router-link to="/reportes">
      <button class="btn-primary">
        <i class="fas fa-chart-line"></i> Generar Reportes
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>

<style scoped>
/* Estilos principales del Dashboard */
.dashboard {
  background-color: #121212;
  color: #f1c40f;
  text-align: center;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 1s ease-in-out;
  max-width: 600px;
  margin: 0 auto;
}

/* Título */
h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
}

/* Estilo para los íconos */
.fas {
  margin-right: 10px;
  color: #f1c40f;
}

/* Estilo del texto */
p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  font-family: 'Arial', sans-serif;
}

/* Estilos para los botones */
button {
  background-color: #f1c40f;
  color: #121212;
  border: none;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  margin: 10px 0; /* Separación entre los botones */
  width: 100%; /* Los botones ocuparán el 100% del ancho disponible */
}

/* Hover del botón */
button:hover {
  background-color: #e1b500;
  transform: translateY(-3px);
}

/* Estilos de los iconos dentro del botón */
button i {
  margin-right: 10px;
}

/* Animación de entrada */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsividad */
@media (max-width: 768px) {
  .dashboard {
    padding: 30px;
  }

  h1 {
    font-size: 2rem;
  }

  button {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .dashboard {
    padding: 20px;
  }

  h1 {
    font-size: 1.8rem;
  }

  button {
    padding: 8px 18px;
    font-size: 0.8rem;
  }
}
</style>
