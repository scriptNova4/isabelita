const catchError = require('../utils/catchError');
const Empresas = require('../models/Empresas');
const Usuarios = require('../models/Usuarios');
const { ValidateUser } = require('../utils/ValidateUser');
const { ValidateEmpresa } = require('../utils/ValidateEmpresa');

const getAll = catchError(async(req, res) => {
    const Resp = await ValidateUser(req)
    if(Resp === "admin"){
        const results = await Empresas.findAll();
        if(!results) res.status(404).json({"message":"Area not found"})
        return res.json(results);
    }
    res.status(400).json({"message":"Unauthorized user"})
});

const create = catchError(async(req, res) => {
    const Resp = await ValidateUser(req)
    if(Resp === "admin"){
        const Respuesta = await ValidateEmpresa(req)
        if(Respuesta.ErrorCampo) res.status(404).json({"message":`${Respuesta.ErrorCampo } Registration Error`})
         const result = await Empresas.create(Respuesta)
        console.log("controllers",result)
         return res.status(201).json({"message":"Data successfully recorded"});
    }
   
    res.status(400).json({"message":"Unauthorized user"})
    
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