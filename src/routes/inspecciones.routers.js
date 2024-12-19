const { getAll, Create, getOne } = require('../controllers/inspecciones.controllers');
const express = require('express');

const routerInspecciones = express.Router();

routerInspecciones.route('/')
    .get(getAll)
    .post(Create);

routerInspecciones.route('/:id')
    .get(getOne)
    
module.exports = routerInspecciones;