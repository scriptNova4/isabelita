const yup = require('yup')

const schema = yup.object().shape({
nombre: yup.string().required(),
planta: yup.string().required(),
area: yup.number().required(),
seccion: yup.string().required(),
img_plano: yup.string()
})


const ValidateEmpresa = async(req) =>{
try{
    const Data = await schema.validate(req.body)
      return Data
}catch(error){
     return  ErrorData={
        ErrorCampo:error.path,
        tipoDato:error.params.type
     }
}
   
   

}
module.exports={ValidateEmpresa}