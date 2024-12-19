const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Inspeccione = sequelize.define('inspeccione', {
    pintura: {
        type: DataTypes.STRING,
        allowNull: false
    },
    golpes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adhesivos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manija_transporte: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manija_disparadora: {
        type: DataTypes.STRING,
        allowNull: false
    },
    presion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manometro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aro_seguridad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    soporte: {
        type: DataTypes.STRING,
        allowNull: false
    },
    acceso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    observacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_registro: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Inspeccione;