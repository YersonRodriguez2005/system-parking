# 🚗 System Parking

**System Parking** es una aplicación web para la gestión de parqueaderos, diseñada para optimizar el control de entrada, salida y asignación de vehículos en espacios disponibles. Proporciona una interfaz moderna, intuitiva y responsive para usuarios administrativos.

---

## 🛠️ Tecnologías utilizadas

### 🔹 Frontend
- ✅ **Vue.js** – Framework progresivo para la construcción de interfaces de usuario.
- ✅ **HTML5** – Estructura semántica del sitio.
- ✅ **CSS3** – Estilos visuales personalizados.
- ✅ **Bootstrap** – Diseño responsive y componentes de UI.

### 🔹 Backend
- ✅ **Node.js** – Entorno de ejecución en JavaScript para el servidor.
- ✅ **Express.js** – Framework minimalista para construir APIs RESTful.

### 🔹 Base de Datos
- ✅ **MySQL** – Sistema de gestión relacional para datos persistentes.

### 🔹 Autenticación
- ✅ **JWT (JSON Web Token)** – Autenticación y autorización segura de usuarios.

---

## 🚀 Características principales

- 📋 **Registro de vehículos:** Añade información detallada como placa, marca, modelo, color y fechas de entrada/salida.
- 🅿️ **Gestión de espacios:** Visualiza en tiempo real los espacios ocupados o libres.
- 🔎 **Consulta y filtros:** Filtra por estado o tipo de vehículo, espacio asignado y más.
- ✏️ **Edición y eliminación:** Administra el estado de los vehículos y elimina registros con confirmación.
- 🔐 **Control de acceso:** Módulo de autenticación para usuarios autorizados.

---

## ⚙️ Instalación y uso

### 1. 🔄 Clonar repositorio

```bash
git clone https://github.com/tu-usuario/system-parking.git
cd system-parking
```

### 2. 📦 Instalar dependencias

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. 🔧 Configurar entorno

#### Base de datos

- Asegúrate de tener MySQL instalado.
- Crea una base de datos con el nombre `system_parking`.
- Configura la conexión en `backend/config/db.js` con tus credenciales.

#### Migraciones (opcional)

```bash
npm run migrate
```

#### API URL en el Frontend

Modifica la URL de conexión en `frontend/src/config.js`:

```js
const API_URL = "http://localhost:3001/api";
```

### 4. ▶️ Ejecutar proyecto

#### Backend

```bash
cd backend
npm start
```

Servirá en: `http://localhost:3001`

#### Frontend

```bash
cd frontend
npm run serve
```

Disponible en: `http://localhost:8080`

---

## 🔐 Consideraciones

- La autenticación está basada en JWT. Asegúrate de tener configurado correctamente el middleware.
- El sistema incluye manejo de errores y validaciones tanto en frontend como en backend.
- Actualización de estado de parqueaderos en tiempo real (cada minuto).

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Puedes:

1. Hacer un fork del proyecto.
2. Crear una nueva rama: `git checkout -b mejora-funcionalidad`
3. Subir tus cambios: `git commit -am 'Agrega nueva funcionalidad'`
4. Hacer un push a tu fork: `git push origin mejora-funcionalidad`
5. Crear un Pull Request.

---

## 📄 Licencia

Este proyecto está licenciado bajo la **MIT License**. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

> Made with ❤️ by Yerson Rodriguez
