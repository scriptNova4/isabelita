const { getAll, create, getOne } = require('../controllers/observador.controllers');
const express = require('express');

const routerObservador = express.Router();

routerObservador.route('/')
    .get(getAll)
    .post(create);

routerObservador.route('/:id')
    .get(getOne)
 

module.exports = routerObservador;