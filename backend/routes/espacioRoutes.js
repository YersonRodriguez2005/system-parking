const express = require('express');
const router = express.Router();
const espaciosController = require('../controllers/espaciosController');

// Ruta para obtener espacios disponibles
router.get('/espacios/disponibles', espaciosController.getEspaciosDisponibles);

// Ruta para actualizar el estado de un espacio (disponible o ocupado)
router.put('/espacios/:idEspacio', espaciosController.updateEspacioEstado);

module.exports = router;
