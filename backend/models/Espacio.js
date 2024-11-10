const { DataTypes } = require('sequelize');
const sequelize = require('../Config/config');

const Espacio = sequelize.define('Espacio', {
  idEspacio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Disponible',
    validate: {
      isIn: [['Disponible', 'Ocupado']]
    }
  }
}, {
  timestamps: false
});

module.exports = Espacio;
