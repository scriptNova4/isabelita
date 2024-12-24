const catchError = require('../utils/catchError');
const Empresas = require('../models/Empresas');
const Usuarios = require('../models/Usuarios');
const Extintores = require('../models/Extintores')
const { ValidateUser } = require('../utils/ValidateUser/ValidateUser');
const { ValidateEmpresa } = require('../utils/empresas/ValidateEmpresa');
const { ValidateUpdate } = require('../utils/empresas/ValidateUpdate');

const getAll = catchError(async(req, res) => {
    const Resp = await ValidateUser(req)
    if(Resp === "admin"){
        const results = await Empresas.findAll({attributes:{exclude:['createdAt','updatedAt','extintoreId']},
            include:[{
                model:Extintores,
                attributes:{exclude:['createdAt','updatedAt','usuarioId']}
            
    }]});
        if(!results) res.status(404).json({"message":"Area not found"})
        return res.json(results);
    }
    res.status(400).json({"message":"Unauthorized user"})
});

const create = catchError(async(req, res) => {
    const Resp = await ValidateUser(req)
    if(Resp === "admin"){
        const Respuesta = await ValidateEmpresa(req)
        console.log(Respuesta)
        if(Respuesta.ErrorCampo) res.status(404).json({"message":`${Respuesta.tipoDato} Registration Error`})
         const result = await Empresas.create(Respuesta)
        console.log("controllers",result)
         return res.status(201).json({"message":"Data successfully recorded"});
    }
   
    res.status(400).json({"message":"Unauthorized user"})
    
});


const update = catchError(async(req, res) => {
    const  id  = parseInt(req.params.id);
    const Resp = await ValidateUser(req)
    if(Resp === "admin"){
        const Respuesta = await ValidateUpdate(req)
        if(Respuesta.ErrorCampo) res.status(404).json({"message":`${Respuesta?.ErrorCampo}  ${Respuesta?.tipoDato} Registration Error`})
    const result = await Empresas.update(req.body,{ where: {id}, returning: true });
    if(result[0] === 0) return res.sendStatus(404);
    return res.status(200).json({"message":"Update added successfully"});
    }
    res.status(400).json({"message":"Unauthorized user"})
})

module.exports = {
    getAll,
    create,
    update
}