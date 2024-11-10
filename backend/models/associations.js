const Vehiculo = require('./Vehiculo');
const Espacio = require('./Espacio');

// Define la relación entre los modelos
Espacio.hasMany(Vehiculo, { foreignKey: 'idEspacio', as: 'vehiculos' });
Vehiculo.belongsTo(Espacio, { foreignKey: 'idEspacio', as: 'espacio' });

module.exports = { Vehiculo, Espacio };
