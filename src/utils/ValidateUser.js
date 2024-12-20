const catchError = require("./catchError");
const Usuarios = require('../models/Usuarios')

const ValidateUser = async(req, res)=>{
  const Result = await Usuarios.findOne({where:{email:req.user.email}})
  console.log("Validate",Result.tipo)
    if(Result.tipo === "admin"){
        return Result.tipo 
    }
    return Result.tipo
}
 module.exports ={ValidateUser}