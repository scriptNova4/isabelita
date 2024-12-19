const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Observador = sequelize.define('observador', {
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    observacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Observador;