const Vehiculo = require('../models/Vehiculo');
const Espacio = require('../models/Espacio');

// Crear un vehículo y asignarle un espacio
exports.createVehiculo = async (req, res) => {
  const { placa, marca, modelo, color, fechaEntrada, fechaSalida, idEspacio } = req.body;

  try {
    // Verificar si ya existe un vehículo con la misma placa
    const existingVehiculo = await Vehiculo.findOne({ where: { placa } });
    if (existingVehiculo) {
      return res.status(400).json({ message: 'Ya existe un vehículo con esta placa' });
    }

    // Verificar si el espacio está disponible
    const espacio = await Espacio.findByPk(idEspacio);
    if (!espacio) {
      return res.status(404).json({ message: 'Espacio no encontrado' });
    }
    if (espacio.estado === 'Ocupado') {
      return res.status(400).json({ message: 'El espacio ya está ocupado' });
    }

    // Crear el vehículo
    const vehiculo = await Vehiculo.create({
      placa,
      marca,
      modelo,
      color,
      fechaEntrada,
      fechaSalida,
      idEspacio // Asignar el espacio al vehículo
    });

    // Actualizar el estado del espacio a 'Ocupado'
    espacio.estado = 'Ocupado';
    await espacio.save();

    res.status(201).json(vehiculo);  // Retornar el vehículo creado
  } catch (error) {
    console.error(error); // Log de errores para diagnóstico
    res.status(500).json({ message: 'Error al guardar el vehículo', error });
  }
};

// Obtener todos los vehículos
exports.getVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll({
      include: [{
        model: Espacio,
        as: 'espacio', // Asegúrate de que coincide con el alias en la relación
        attributes: ['idEspacio', 'ubicacion', 'estado']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    const formattedVehiculos = vehiculos.map(vehiculo => {
      const plainVehiculo = vehiculo.get({ plain: true });
      return {
        ...plainVehiculo,
        fechaEntrada: plainVehiculo.fechaEntrada ? new Date(plainVehiculo.fechaEntrada).toLocaleString() : null,
        fechaSalida: plainVehiculo.fechaSalida ? new Date(plainVehiculo.fechaSalida).toLocaleString() : null
      };
    });
    
    res.json(formattedVehiculos);
  } catch (error) {
    console.error('Error en getVehiculos:', error);
    res.status(500).json({ message: 'Error al obtener vehículos', error: error.message });
  }
};



// Obtener un vehículo por su ID
exports.getVehiculoById = async (req, res) => {
  const { idVehiculo } = req.params;

  try {
    const vehiculo = await Vehiculo.findByPk(idVehiculo, {
      include: [{
        model: Espacio,
        as: 'espacio',
        attributes: ['idEspacio', 'ubicacion', 'estado']
      }]
    });

    if (!vehiculo) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    res.json(vehiculo);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el vehículo', error });
  }
};

// Actualizar un vehículo
exports.updateVehiculo = async (req, res) => {
  const { idVehiculo } = req.params;
  const { placa, marca, modelo, color, fechaEntrada, fechaSalida, idEspacio } = req.body;

  try {
    const vehiculo = await Vehiculo.findByPk(idVehiculo);

    if (!vehiculo) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    if (idEspacio && idEspacio !== vehiculo.idEspacio) {
      const espacioAnterior = await Espacio.findByPk(vehiculo.idEspacio);
      if (espacioAnterior) {
        espacioAnterior.estado = 'Disponible';
        await espacioAnterior.save();
      }

      const nuevoEspacio = await Espacio.findByPk(idEspacio);
      if (!nuevoEspacio) {
        return res.status(404).json({ message: 'Nuevo espacio no encontrado' });
      }
      nuevoEspacio.estado = 'Ocupado';
      await nuevoEspacio.save();

      vehiculo.idEspacio = idEspacio;
    }

    vehiculo.placa = placa || vehiculo.placa;
    vehiculo.marca = marca || vehiculo.marca;
    vehiculo.modelo = modelo || vehiculo.modelo;
    vehiculo.color = color || vehiculo.color;
    vehiculo.fechaEntrada = fechaEntrada || vehiculo.fechaEntrada;
    vehiculo.fechaSalida = fechaSalida || vehiculo.fechaSalida;

    await vehiculo.save();
    res.json(vehiculo);
  } catch (error) {
    console.error('Error al actualizar el vehículo:', error);
    res.status(500).json({ message: 'Error al actualizar el vehículo', error });
  }
};


// Eliminar un vehículo
exports.deleteVehiculo = async (req, res) => {
  const { idVehiculo } = req.params;

  try {
    const vehiculo = await Vehiculo.findByPk(idVehiculo);

    if (!vehiculo) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    // Liberar el espacio cuando el vehículo se elimina (se actualiza el estado del espacio)
    const espacio = await Espacio.findByPk(vehiculo.idEspacio);
    if (espacio) {
      espacio.estado = 'Disponible';
      await espacio.save();
    }

    await vehiculo.destroy();
    res.json({ message: 'Vehículo eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el vehículo', error });
  }
};

// Actualizar estado del espacio a 'Disponible' cuando se registra la salida
exports.updateVehiculoSalida = async (req, res) => {
  const { idVehiculo } = req.params;

  try {
    const vehiculo = await Vehiculo.findByPk(idVehiculo);
    if (!vehiculo) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    // Actualizar la fecha de salida del vehículo
    vehiculo.fechaSalida = new Date().toISOString(); // O la fecha que sea necesaria
    await vehiculo.save();

    // Liberar el espacio asociado con el vehículo (cambiar estado a 'Disponible')
    const espacio = await Espacio.findByPk(vehiculo.idEspacio);
    if (espacio) {
      espacio.estado = 'Disponible';
      await espacio.save();
    }

    res.json({ message: 'Salida registrada correctamente', vehiculo });
  } catch (error) {
    console.error('Error al registrar la salida:', error);
    res.status(500).json({ message: 'Error al registrar la salida', error });
  }
};
