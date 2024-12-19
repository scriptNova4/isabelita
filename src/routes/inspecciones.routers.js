const { getAll, Create, getOne } = require('../controllers/inspecciones.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerInspecciones = express.Router();

routerInspecciones.route('/')
    .get(verifyJWT,getAll)
    .post(verifyJWT, Create);

routerInspecciones.route('/:id')
    .get(verifyJWT, getOne)
    
module.exports = routerInspecciones;