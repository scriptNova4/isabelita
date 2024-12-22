const { getAll, create, getOne } = require('../controllers/observador.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerObservador = express.Router();

routerObservador.route('/')
    .get(getAll)
    .post(verifyJWT,create);

routerObservador.route('/:id')
    .get(getOne)
 

module.exports = routerObservador;