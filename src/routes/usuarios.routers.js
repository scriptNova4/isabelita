const { getAll, Create, getOne, Update, Login, Logout } = require('../controllers/usuario.controllers');
const express = require('express');

const routerUsuarios = express.Router();

routerUsuarios.route('/')
    .get(getAll)
    .post(Create);

routerUsuarios.route('/login')
     .post(Login)
routerUsuarios.route('/logout')
      .post(Logout)        
     
routerUsuarios.route('/:id')
    .get(getOne)
    .put(Update);

module.exports = routerUsuarios;