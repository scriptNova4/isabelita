const { getAll, Create, getOne,  Update } = require('../controllers/extintores.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerExtintores = express.Router();

routerExtintores.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, Create);

routerExtintores.route('/:id')
    .get(verifyJWT, getOne)
    .put(verifyJWT, Update);

module.exports = routerExtintores;