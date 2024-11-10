<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">
          <i class="fas fa-envelope"></i> Correo Electrónico:
        </label>
        <input type="email" v-model="email" id="email" placeholder="Ingrese su correo electrónico" required />
      </div>

      <div class="form-group">
        <label for="password">
          <i class="fas fa-lock"></i> Contraseña:
        </label>
        <input type="password" v-model="password" id="password" placeholder="Ingrese su contraseña" required />
      </div>

      <button type="submit">
        <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification';

export default {
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const toast = useToast(); // Instanciar useToast

    const loginUser = async () => {
      try {
        const response = await axios.post("http://localhost:3001/api/login", {
          email: email.value,
          password: password.value,
        });
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard");
        toast.success("¡Inicio de sesión exitoso!"); // Mostrar mensaje de éxito
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || "Error desconocido"); // Mostrar mensaje de error
        } else {
          toast.error("No se pudo conectar al servidor");
        }
      }
    };

    return { email, password, loginUser };
  },
};
</script>

<style scoped>
/* Contenedor principal */
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  background-color: #121212;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  color: #f1c40f;
}

/* Título */
h2 {
  text-align: center;
  color: #f1c40f;
  margin-bottom: 25px;
  font-size: 1.8rem;
}

/* Estilos de los íconos en los labels */
label i {
  margin-right: 8px;
  color: #f1c40f;
}

/* Estilos de los grupos del formulario */
.form-group {
  margin-bottom: 20px;
}

input {
  width: 94%;
  padding: 12px;
  border: 1px solid #f1c40f;
  border-radius: 6px;
  margin-top: 5px;
  font-size: 1rem;
  background-color: #1e1e1e;
  color: #f1c40f;
  transition: border-color 0.3s;
}

input::placeholder {
  color: #bfa73a;
}

input:focus {
  border-color: #f1c40f;
  outline: none;
}

/* Botón */
button {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  color: #121212;
  background-color: #f1c40f;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #d4a60d;
}

button i {
  margin-right: 8px;
}

/* Responsividad */
@media (max-width: 768px) {
  .login-container {
    padding: 20px;
    margin-top: 50px;
  }

  h2 {
    font-size: 1.5rem;
  }

  button {
    font-size: 0.9rem;
  }
}
</style>
