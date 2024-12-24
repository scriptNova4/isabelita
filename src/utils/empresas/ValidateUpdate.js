const yup = require('yup')


const schemaUpdate= yup.object().shape({

    nombre: yup.string().min(4),
    planta: yup.string().min(4),
    img_plano: yup.string().url(),
    area: yup.string().min(4),
    seccion: yup.string()

})



const ValidateUpdate = async(req) =>{
    try{
        const Data = await schemaUpdate.validate(req.body)
        return Data
    }catch(error){
            return error
    }
}

module.exports={ValidateUpdate}