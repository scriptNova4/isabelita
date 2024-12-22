const catchError = require('../utils/catchError');
const Observador = require('../models/Observador');

const getAll = catchError(async(req, res) => {
    const results = await Observador.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    
    const result = await Observador.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Observador.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});





module.exports = {
    getAll,
    create,
    getOne,
}