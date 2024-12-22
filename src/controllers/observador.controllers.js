const catchError = require('../utils/catchError');
const Observador = require('../models/Observador');
const { ValidateUser } = require('../utils/ValidateUser/ValidateUser');
const { ValidateCreate } = require('../utils/Observador/ValidateCreate');
const Extintor = require('../models/Extintores');
const { sendEmail } = require('../utils/sendEmail/sendEmail');

const getAll = catchError(async(req, res) => {
    const results = await Observador.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {

    const UserTipo = await ValidateUser(req)
    
    if(UserTipo === 'admin' || UserTipo ==='user'){
       const Result = await ValidateCreate(req)
      if(Result.path) return res.status(404).json({"message":`${Result.errors}`})
        const ext = await Extintor.findOne({where:{id:Result.extintoreId}})
        const result = await Observador.create(Result)
        if(!result) return res.status(404).json({"message":"Observation not recorded"})
        await sendEmail({
            to: "rincon303@gmail.com", // Email del receptor
            subject: "Extintor con Observacion -Ojo--", // asunto
            html: ` 
                    <div>
                            <h1>Observacion de Extintor</h1>
                            <p>El extintor con codigo interno ${ext.codigo} tiene la siguiente Observacion: </p><br/>
                            <p>${Result.observacion}</p><<br/>
                            <img src="${Result.imagen}"/><br/>
                            <p>Usuario que genero el reporte ${req.user.email}</p>

                    </div>
            ` // con backtics ``
    })
    return res.status(201).json({"message":"Observation sent successfully"})

    }
    
  
    return res.status(404).json({"message":"Unauthorized User"});
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