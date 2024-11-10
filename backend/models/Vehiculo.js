const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Config/config');

class Vehiculo extends Model {}

Vehiculo.init({
  idVehiculo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  placa: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  marca: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  color: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  fechaEntrada: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fechaSalida: {
    type: DataTypes.DATE,
    allowNull: true
  },
  idEspacio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Espacios',
      key: 'idEspacio'
    }
  }
}, {
  sequelize,
  modelName: 'Vehiculo',
  tableName: 'vehiculos',
  timestamps: true
});

module.exports = Vehiculo;
