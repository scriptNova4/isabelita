const catchError = require('../utils/catchError');
const Inspecciones = require('../models/Inspecciones');
const { ValidateUser } = require('../utils/ValidateUser/ValidateUser');

const getAll = catchError(async(req, res) => {
    const TipoUser = await ValidateUser(req)
    if(TipoUser ==='admin'){
        const results = await Inspecciones.findAll();
        if(!results) res.status(404).json({"message":"There are no inspections"})
        return res.status(200).json(results);
    }
    return res.status(404).json({"message":"Unauthorized User"})
});

const Create = catchError(async(req, res) => {
    const TipoUser = await ValidateUser(req)
    if(TipoUser ==="admin" || TipoUser ==="inspector"){
        const result = await Inspecciones.create(req.body);
        return res.status(201).json(result);
    }
    return res.status(404).json({"message":"Unauthorized User"})
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