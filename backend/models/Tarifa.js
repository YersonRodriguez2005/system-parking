const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Config/config');

class Tarifa extends Model {}

Tarifa.init({
    idTarifa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Tarifa',
    tableName: 'tarifas',
});

module.exports = Tarifa;
