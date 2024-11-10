const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Endpoint para obtener reportes de ocupación y finanzas
router.get('/reportes/:tipo/:periodo', reportController.generarReporte);

// Ruta para generar el reporte en PDF
router.get('/reportes/pdf/:tipo/:periodo', reportController.generarReportePDF);


module.exports = router;
