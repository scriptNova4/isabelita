const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Empresa = sequelize.define('empresa', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    planta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img_plano: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

module.exports = Empresa;