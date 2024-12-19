const catchError = require('../utils/catchError');
const Extintores = require('../models/Extintores');
const Usuario = require('../models/Usuarios');

const getAll = catchError(async(req, res) => {
    const results = await Extintores.findAll();
    return res.json(results);
});

const Create = catchError(async(req, res) => {
    const result = await Extintores.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const Users = await Usuario.findOne({where:{email:req.user.email}})
    if(Users.tipo==="admin"){
        const  id  = parseInt(req.params.id);
        const result = await Extintores.findByPk(id);
        return res.status(200).json(result);
    }else{
        return res.status(404).json({"message":"Unauthorized user"})
    }
    //if(!result) return res.sendStatus(404);
    
});


const Update = catchError(async(req, res) => {
    const  id  = parseInt(req.params.id);
    const result = await Extintores.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    Create,
    getOne,
    Update
}