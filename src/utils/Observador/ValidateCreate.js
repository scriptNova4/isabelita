const yup = require('yup')
const Usuarios = require('../../models/Usuarios')
const Extintor = require('../../models/Extintores')

const schemaObservador = yup.object().shape({
imagen: yup.string().url(),
observacion: yup.string().lowercase()
})


const ValidateCreate = async(req)=>{
    
    const Users = await Usuarios.findOne({where:{email:req.user.email}})
    const extintor = await Extintor.findOne({where:{id:req.body.extintor}})
   
    try{
        const Respuesta = await schemaObservador.validate(req.body)
        console.log("Respuesta",Respuesta)
        Respuesta.usuarioId = Users.id
        Respuesta.extintoreId = extintor.id
        return Respuesta

    }catch(error){
             return error
    }
}

module.exports={ValidateCreate}