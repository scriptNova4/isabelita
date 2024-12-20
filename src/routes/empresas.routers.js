const { getAll, create, update } = require('../controllers/empresas.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerEmpresas = express.Router();

routerEmpresas.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

routerEmpresas.route('/:id')
    .put(verifyJWT, update);

module.exports = routerEmpresas;