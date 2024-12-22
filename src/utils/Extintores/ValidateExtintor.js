const yup = require('yup')
const Usuario = require('../../models/Usuarios')


const schemaExtintor = yup.object().shape({

codigo: yup.string().lowercase().min(4),
peso: yup.number().required().min(1),
agente: yup.string().lowercase().min(2),
clase: yup.string().lowercase(),
imagen: yup.string().lowercase().url(),
f_prox_mto: yup.date(),
f_caducidad_agente: yup.date(),
f_prueba_hidro: yup.date(),
ubicacion: yup.string().lowercase(),

})


const ValidateExtintor = async(req)=>{
       
      const Users = await Usuario.findOne({where:{email:req.user.email}})
        
    try{
        const Resultado = await schemaExtintor.validate(req.body)
        Resultado.usuarioId = Users.id;
        Resultado.status =0;
        console.log(Resultado)
        return Resultado
       
    }catch(error){
   return error
    }

    
}

module.exports = {ValidateExtintor}