const catchError = require('../utils/catchError');
const Inspecciones = require('../models/Inspecciones');

const getAll = catchError(async(req, res) => {
    const results = await Inspecciones.findAll();
    return res.json(results);
});

const Create = catchError(async(req, res) => {
    const result = await Inspecciones.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Inspecciones.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});





module.exports = {
    getAll,
    Create,
    getOne,
}