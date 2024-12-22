const yup = require('yup')
const Usuario = require('../models/Usuarios')
const  bcrypt  = require('bcrypt')

const schemaUpdateUser = yup.object().shape({
nombre: yup.string().lowercase(),
apellidos: yup.string().lowercase(),
tipo: yup.string().lowercase(),
password : yup.string().min(6),
cargo: yup.string().lowercase(),
email: yup.string().email()
}) 

const schemaUpdate = yup.object().shape({
    password: yup.string().min(6)
})


const ValidateUpdateUser = async(req) =>{

   const Users = await Usuario.findOne({where:{email:req.user.email}})
   if(Users.tipo === "admin"){
            try{
                const Data = await schemaUpdateUser.validate(req.body)
                const setPassword = await bcrypt.hash(Data.password, 10)
                Data.password=setPassword;
                return Data  

            }catch(error){
                return error

            }
   }else if(Users.tipo !="admin" && Users.status === '0') {
     try{
         const Resultado = await schemaUpdate.validate(req.body)
         const setPassword = await bcrypt.hash(Resultado.password, 10)
         Resultado.status=1;
         Resultado.password = setPassword;
         return Resultado
     }catch(error){
          return error
     }

   }else{
       return {"message":"Unauthorized user"}
   }
    
   
    

}

module.exports={ValidateUpdateUser}