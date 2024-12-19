const { getAll, Create, getOne, Update, Login, Logout, Logged } = require('../controllers/usuario.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerUsuarios = express.Router();

routerUsuarios.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, Create);

routerUsuarios.route('/login')
     .post(Login)
routerUsuarios.route('/logout')
      .post(Logout)        
routerUsuarios.route('/me')
       .get(verifyJWT, Logged)     
routerUsuarios.route('/:id')
    .get(verifyJWT, getOne)
    .put(Update);

module.exports = routerUsuarios;