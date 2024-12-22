const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Extintores = sequelize.define('extintore', {
    codigo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    peso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    agente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clase: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    f_prox_mto: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    f_cadicidad_agente: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    f_prueba_hidro: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false
    },

    status:{
        type:DataTypes.STRING,
        allowNull:false
    }
    

});

module.exports = Extintores;