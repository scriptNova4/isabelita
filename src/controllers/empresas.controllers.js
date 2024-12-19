const catchError = require('../utils/catchError');
const Empresas = require('../models/Empresas');

const getAll = catchError(async(req, res) => {
    const results = await Empresas.findAll();
    return res.json(results);
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