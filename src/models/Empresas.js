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
        allowNull: true
    },
    area: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    seccion:{
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Empresa;