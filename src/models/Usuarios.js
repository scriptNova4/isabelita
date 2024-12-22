const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Usuario = sequelize.define('usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
    password: {
        type: DataTypes.STRING,
        allowNull: false
        
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,        
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,        
    },    
});

module.exports = Usuario;