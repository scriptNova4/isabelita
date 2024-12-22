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
       newUpdate ={
        status:1
       }
      //cambiamos el estado al extintor para que muestre una alerta!!
        const updateStadoextintor = await Extintor.update(newUpdate,{where:{id:Result.extintoreId}, returning:true})
        const result = await Observador.create(Result)
        if(!result) return res.status(404).json({"message":"Observation not recorded"})
        await sendEmail({
            to: "rincon303@gmail.com", // Email del receptor
            subject: "Extintor con Observacion", // asunto
            html: ` 
                    <div className={"flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700" role="alert"}>
                            <h1>Observacion de Extintor</h1>
                            <p>El extintor con codigo interno ${ext.codigo} tiene la siguiente Observacion: </p><br/>
                            <p>${Result.observacion}</p><<br/>
                            <p>Esta ubicado ==> ${ext.ubicacion}</p><br/>
                            <img src="${Result.imagen}"/><br/>
                            <p>Usuario que genero el reporte ${req.user.email}</p>

                    </div>
            ` 
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