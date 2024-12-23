const catchError = require('../utils/catchError');
const Extintores = require('../models/Extintores');
const Usuario = require('../models/Usuarios');
const { ValidateUser } = require('../utils/ValidateUser/ValidateUser');
const { ValidateExtintor } = require('../utils/Extintores/ValidateExtintor');

const getAll = catchError(async(req, res) => {
    const Resp = await ValidateUser(req)
    if(Resp ==="admin"){
        const results = await Extintores.findAll({attributes:{exclude:['createdAt','updatedAt','id','usuarioId']},
            include:[{
                model:Usuario,
                attributes:{exclude:['createdAt','updatedAt','status','id','password']}
           }]});
          results.forEach((items)=>{
            delete items.createdAt
            delete items.updatedAt
            delete items.usuarioId  
            return items          
         })

        return res.status(200).json(results);
    }

    res.status(404).json({"message":"Unauthorized user"})
});

const Create = catchError(async(req, res) => {
    const Resp = await ValidateUser(req)
    if(Resp === "admin"){
        const Resul = await ValidateExtintor(req);
        if(Resul.path) return res.status(404).json({"message":`${Resul.errors}`})
        const result = await Extintores.create(Resul);
        if(!result) return res.status(404).json({"message":"Error registering the fire extinguisher"})
        return res.status(201).json({"message":"registration successfully"});
        }
        res.status(404).json({"message":"Unauthorized user"})
});

const getOne = catchError(async(req, res) => {
    const Resp = await ValidateUser(req)
    if(Resp === "admin"){
        const  id  = parseInt(req.params.id);
        const result = await Extintores.findByPk(id);
        return res.status(200).json(result);
    }
        return res.status(404).json({"message":"Unauthorized user"})    
});


const Update = catchError(async(req, res) => {
    const Resp = await ValidateUser(req)
    if(Resp === "admin"){
        const  id  = parseInt(req.params.id);
        const result = await Extintores.update(
            req.body,
            { where: {id}, returning: true }
        );

        if(result[0] === 0) return res.sendStatus(404);
        return res.json(result[1][0]);
    }
    return res.status(404).json({"message":"Unauthorized user"})
});

module.exports = {
    getAll,
    Create,
    getOne,
    Update
}