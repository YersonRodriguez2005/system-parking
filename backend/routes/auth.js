const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Endpoint de autenticación (login)
router.post('/login', authController.login);

module.exports = router;
