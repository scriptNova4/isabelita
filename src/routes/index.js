const express = require('express');
const routerUsuarios = require('./usuarios.routers');
const routerExtintores = require('./extintores.routers');
const routerInspecciones = require('./inspecciones.routers');
const routerEmpresas = require('./empresas.routers');
const routerObservador = require('./observador.routers');
const router = express.Router();

// colocar las rutas aquí

router.use('/usuarios', routerUsuarios)
router.use('/extintores', routerExtintores)
router.use('/inspecciones', routerInspecciones)
router.use('/empresas',routerEmpresas)
router.use('/observador', routerObservador)

module.exports = router;