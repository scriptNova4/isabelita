const yup = require('yup')

const shemaInspecciones = yup.object().shape({


}) 



const ValidateInspecciones = async(req)=>{
        

       const Resultado = await shemaInspecciones.validate(req.body)
}

module.exports={ValidateInspecciones}