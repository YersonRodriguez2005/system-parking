const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const vehiculoRoutes = require('./routes/vehiculoRoutes');
const espacioRoutes = require('./routes/espacioRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Importar la configuración de Sequelize y los modelos
const { sequelize } = require('./models');
require('./models/associations');

app.use(express.json());

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rutas de la API
app.use('/api', authRoutes);
app.use('/api', vehiculoRoutes);
app.use('/api', espacioRoutes);
app.use('/api', reportRoutes);

// Sincronizar la base de datos y luego iniciar el servidor
const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });
