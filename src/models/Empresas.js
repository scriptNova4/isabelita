// Importa los tipos de datos y la conexión configurada con Sequelize 2
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

// Define el modelo 'Empresa' con sus campos y configuraciones
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
    seccion: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

// Exporta el modelo para usarlo en otras partes del proyecto
module.exports = Empresa;
