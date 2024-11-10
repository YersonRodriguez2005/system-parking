
# System Parking

**System Parking** es una aplicación web de gestión de parqueaderos, diseñada para facilitar la administración de vehículos y espacios de estacionamiento. Permite a los usuarios registrar vehículos, gestionar espacios disponibles, y controlar el flujo de entrada y salida de los vehículos en tiempo real. Además, ofrece una interfaz intuitiva para la visualización de los espacios de estacionamiento y la edición de la información de los vehículos.

## Tecnologías utilizadas

El proyecto utiliza las siguientes tecnologías:

- **Frontend**:  
  - ![Vue.js](https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/vue-dot-js.svg) **Vue.js**: Framework de JavaScript para la construcción de interfaces de usuario reactivas.
  - ![HTML5](https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/html5.svg) **HTML5**: Para la estructura de la interfaz.
  - ![CSS3](https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/css3.svg) **CSS3**: Para el estilo de la interfaz.
  - ![Bootstrap](https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/bootstrap.svg) **Bootstrap**: Para el diseño responsivo y componentes de interfaz.

- **Backend**:
  - ![Node.js](https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/node-dot-js.svg) **Node.js**: Entorno de ejecución para JavaScript en el servidor.
  - ![Express.js](https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/express.svg) **Express.js**: Framework web para Node.js que facilita la creación de APIs RESTful.

- **Base de datos**:
  - ![MySQL](https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/mysql.svg) **MySQL**: Sistema de gestión de bases de datos relacional utilizado para almacenar la información de vehículos, espacios y usuarios.

- **Autenticación**:
  - ![JWT](https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/jsonwebtokens.svg) **JSON Web Token (JWT)**: Para la autenticación y autorización de usuarios.

## Características principales

- **Registro de vehículos**: Los usuarios pueden agregar vehículos con detalles como placa, marca, modelo, color, y fechas de entrada y salida.
- **Gestión de espacios**: Los espacios de estacionamiento se gestionan en tiempo real, mostrando los disponibles y ocupados, permitiendo el registro de un vehículo en un espacio específico.
- **Visualización de vehículos y espacios**: Interfaz intuitiva para filtrar y ver vehículos registrados y la disponibilidad de los espacios.
- **Edición y eliminación**: Los usuarios pueden editar y eliminar los vehículos registrados, con confirmación antes de realizar la eliminación.

## Cómo descargar y utilizar el proyecto

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/system-parking.git
cd system-parking
```

### 2. Instalar dependencias

#### Backend

Ve a la carpeta del backend (`/backend`) y ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
cd backend
npm install
```

#### Frontend

Ve a la carpeta del frontend (`/frontend`) y ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
cd frontend
npm install
```

### 3. Configuración

#### Backend

- Asegúrate de tener **Node.js** y **MySQL** instalados en tu sistema.
- Crea una base de datos en MySQL y configura los parámetros de conexión en el archivo `backend/config/db.js`.
- Si no tienes una base de datos, puedes utilizar las migraciones para crear las tablas necesarias:

```bash
npm run migrate
```

#### Frontend

- Configura la URL base para las peticiones HTTP en el archivo `frontend/src/config.js` con la dirección de tu backend:

```javascript
const API_URL = "http://localhost:3001/api";
```

### 4. Ejecutar el proyecto

#### Backend

En la carpeta `/backend`, ejecuta el siguiente comando para iniciar el servidor:

```bash
npm start
```

El servidor de backend debería estar corriendo en `http://localhost:3001`.

#### Frontend

En la carpeta `/frontend`, ejecuta el siguiente comando para iniciar el servidor de desarrollo:

```bash
npm run serve
```

El frontend debería estar corriendo en `http://localhost:8080`.

### 5. Acceso a la aplicación

Abre tu navegador y ve a la URL `http://localhost:8080`. Podrás ver la interfaz de **System Parking** y comenzar a gestionar los vehículos y los espacios de estacionamiento.

## Consideraciones importantes

- **Autenticación**: Asegúrate de que las credenciales de usuario y la autenticación estén configuradas correctamente. El proyecto utiliza JWT para autenticar a los usuarios.
- **Manejo de errores**: El sistema maneja errores tanto en el backend como en el frontend, mostrando mensajes apropiados cuando algo sale mal.
- **Actualización en tiempo real**: La aplicación está configurada para actualizar los datos de vehículos y espacios cada minuto de forma automática.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar el proyecto, por favor realiza un **fork**, haz los cambios y envía un **pull request**. Asegúrate de que las pruebas sean correctas antes de enviar la solicitud.

## Licencia

Este proyecto está bajo la **Licencia MIT**. Para más detalles, consulta el archivo [LICENSE](LICENSE).

---

Si tienes alguna pregunta o encuentras algún problema, no dudes en abrir un **issue** o enviarme un mensaje.
