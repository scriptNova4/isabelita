const Usuarios = require('./Usuarios')
const Empresas = require('./Empresas')
const Extintores = require('./Extintores')
const Inspecciones = require('./Inspecciones')
const Observador = require('./Observador')



Extintores.belongsTo(Usuarios)
Usuarios.hasMany(Extintores)

Inspecciones.belongsTo(Extintores)
Extintores.hasMany(Inspecciones)

Inspecciones.belongsTo(Usuarios)
Usuarios.hasMany(Inspecciones)

Empresas.belongsTo(Extintores)
Extintores.hasMany(Empresas)

Observador.belongsTo(Usuarios)
Usuarios.hasMany(Observador)

Observador.belongsTo(Extintores)
Extintores.hasMany(Observador)