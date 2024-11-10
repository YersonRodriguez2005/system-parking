const Espacio = require('../models/Espacio');

// Obtener espacios disponibles
async function getEspaciosDisponibles(req, res) {
    try {
        const espacios = await Espacio.findAll({
            where: { estado: 'Disponible' }
        });

        if (espacios.length === 0) {
            return res.status(404).json({ message: 'No hay espacios disponibles' });
        }

        // Retorna los espacios disponibles
        res.json(espacios);
    } catch (error) {
        console.error(error);  // Imprime el error para depuración
        res.status(500).json({ error: 'Error al obtener espacios disponibles' });
    }
}

// Actualizar el estado de un espacio (Disponible a Ocupado, o viceversa)
async function updateEspacioEstado(req, res) {
    const { idEspacio } = req.params;
    const { estado } = req.body;

    try {
        const espacio = await Espacio.findByPk(idEspacio);
        if (!espacio) {
            return res.status(404).json({ message: 'Espacio no encontrado' });
        }
        if (espacio.estado !== 'Disponible') {
            return res.status(400).json({ message: 'El espacio ya está ocupado' });
        }


        // Actualizar el estado del espacio
        espacio.estado = estado;
        await espacio.save();

        // Retornar el espacio actualizado
        res.json(espacio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el estado del espacio' });
    }
}

module.exports = {
    getEspaciosDisponibles,
    updateEspacioEstado,
};
