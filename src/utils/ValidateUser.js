const catchError = require("./catchError");
const Usuarios = require('../models/Usuarios')



const ValidateUser = async(req, res)=>{
  console.log(req.user)
  const Result = await Usuarios.findOne({where:{email:req.user.email}})
    if(Result.tipo === "admin"){
        return Result.tipo 
    }
    return Result.tipo
}

 module.exports ={ValidateUser}



 