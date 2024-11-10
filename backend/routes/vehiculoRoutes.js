const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoController');

// Crear vehículo
router.post('/vehiculos', vehiculoController.createVehiculo);

// Obtener todos los vehículos
router.get('/vehiculos', vehiculoController.getVehiculos);

// Obtener un vehículo por ID
router.get('/vehiculos/:idVehiculo', vehiculoController.getVehiculoById);

// Actualizar vehículo
router.put('/vehiculos/:idVehiculo', vehiculoController.updateVehiculo);

// Eliminar vehículo
router.delete('/vehiculos/:idVehiculo', vehiculoController.deleteVehiculo);

// Actualizar Salida de vehículo
router.put('/vehiculos/salida/:idVehiculo', vehiculoController.updateVehiculoSalida);

module.exports = router;
