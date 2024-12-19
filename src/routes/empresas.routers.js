const { getAll, create, update } = require('../controllers/empresas.controllers');
const express = require('express');

const routerEmpresas = express.Router();

routerEmpresas.route('/')
    .get(getAll)
    .post(create);

routerEmpresas.route('/:id')
    .put(update);

module.exports = routerEmpresas;