const sequelize = require('../Config/config');
const Vehiculo = require('./Vehiculo');
const Espacio = require('./Espacio');

// Importa y define las asociaciones
require('./associations');

module.exports = { sequelize, Vehiculo, Espacio };
