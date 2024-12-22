const yup = require('yup')
const bcrypt = require('bcrypt')



const schemaCreateUser = yup.object().shape({
    nombre: yup.string().required().lowercase(),
    apellidos: yup.string().lowercase().required(),
    tipo: yup.string().lowercase().required(),
    password: yup.string().required().min(6),
    imagen:yup.url,
    cargo: yup.string().lowercase().required(),
    email: yup.string().email()
    })

    const ValidateCreteuser = async(req) =>{
        try{
          const Datos = await schemaCreateUser.validate(req.body)
          const setPassword = await bcrypt.hash(Datos.password, 10)
           Datos.password = setPassword;
           Datos.status=0
          return Datos
        
        }catch(error){
              return error
        }
          
         }
        
         module.exports ={ValidateCreteuser}