const catchError = require('../utils/catchError');
const Extintores = require('../models/Extintores');
const Usuario = require('../models/Usuarios');
const { ValidateUser } = require('../utils/ValidateUser');

const getAll = catchError(async(req, res) => {
    const Resp = await ValidateUser(req)
    if(Resp ==="admin"){
        const results = await Extintores.findAll();
        return res.status(200).json(results);
    }

    res.status(404).json({"message":"Unauthorized user"})
});

const Create = catchError(async(req, res) => {
    const Resp = await ValidateUser(req)
    if(Resp === "admin"){
        const result = await Extintores.create(req.body);
        return res.status(201).json(result);
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