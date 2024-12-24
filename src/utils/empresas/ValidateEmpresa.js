const yup = require('yup')

const schema = yup.object().shape({
nombre: yup.string().required(),
planta: yup.string().required(),
area: yup.number().required(),
seccion: yup.string().required(),
img_plano: yup.string().url()
})


const ValidateEmpresa = async(req) =>{
  console.log(req.body)
  
try{
    const Data = await schema.validate(req.body)
    console.log("Data",Data)
      return Data
    }catch(error){
      console.log(error)
      return  ErrorData={
         ErrorCampo:error.path,
         tipoDato:error.errors
      }
}
   
   

}
module.exports={ValidateEmpresa}