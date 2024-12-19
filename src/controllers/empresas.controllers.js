const catchError = require('../utils/catchError');
const Empresas = require('../models/Empresas');
const Usuarios = require('../models/Usuarios')

const getAll = catchError(async(req, res) => {
    const Users = Usuarios.findOne({where:{email: req.user.email}})
    if(Users.tipo === "admin"){
        const results = await Empresas.findAll();
        if(!results) res.status(404).json({"message":"Area not found"})
        return res.json(results);
    }
    res.status(400).json({"message":"Unauthorized user"})
});

const create = catchError(async(req, res) => {
    
    const result = await Empresas.create(req.body);
    return res.status(201).json(result);
});


const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Empresas.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    update
}