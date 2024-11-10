const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
require('dotenv').config();

// Función para el login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Buscar al usuario en la base de datos
        const usuario = await Usuario.findOne({ where: { email } });

        // 2. Verificar si el usuario existe
        if (!usuario) {
            return res.status(401).json({ message: 'Usuario no encontrado.' });
        }

        // 3. Comparar la contraseña ingresada con la almacenada en la base de datos (sin bcrypt)
        if (password !== usuario.password) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        // 4. Generar un token JWT
        const token = jwt.sign(
            { idUsuario: usuario.idUsuario, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // 5. Retornar el token en la respuesta
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};
