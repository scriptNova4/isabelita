const yup = require('yup')
const Usuarios = require('../../models/Usuarios')
const Extintor = require('../../models/Extintores')
const { extensions } = require('sequelize/lib/utils/validator-extras')

const schemaObservador = yup.object().shape({
imagen: yup.string().url(),
observacion: yup.string().lowercase(),
extintor: yup.number(),
})


const ValidateCreate = async(req)=>{
    
    const Users = await Usuarios.findOne({where:{email:req.user.email}})
    const extintor = await Extintor.findOne({where:{id:req.body.extintor}})
   
    try{
        const Respuesta = await schemaObservador.validate(req.body)
        Respuesta.usuarioId = Users.id
        Respuesta.extintoreId = extintor.id
        return Respuesta

    }catch(error){
             return error
    }
}

module.exports={ValidateCreate}