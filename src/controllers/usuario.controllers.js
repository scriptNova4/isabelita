const catchError = require('../utils/catchError');
const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {ValidateUser}  = require('../utils/ValidateUser');
const { ValidateLogin } = require('../utils/ValidateLogin');
const { ValidateCreteuser } = require('../utils/ValidateCreateUser');
const { ValidateUpdateUser } = require('../utils/ValidateUpdateUser');


const getAll = catchError(async (req, res) => {
    const Resp = await ValidateUser(req)
     if(Resp === "admin"){
         const result = await Usuarios.findAll()
        if(!result) return res.status(400).json(result)
            return res.status(200).json(result)
     }
     res.status(400).json({"message":"Unauthorized user"})    
});

const Create = catchError(async (req, res) => {
    const Resp = await ValidateUser(req)
    if(Resp === "admin" ){
        const Resul = await ValidateCreteuser(req)
        if(Resul.path) res.status(404).json({"message":`${Resul.errors}`})
       const result = await Usuarios.create(Resul)
            if(!result) res.status(404).json({"message":"User not created"})
            return res.status(200).json({"message":"User created successfully"})
    }
    res.status(400).json({"message":"Unauthorized user"})
})


const getOne = catchError (async ( req , res )=>{
    const Resp = await ValidateUser(req)
    if(Resp === "admin"){
        const id = parseInt(req.params.id)        
        const result = await Usuarios.findOne({where:{id}})    
        if(!result) return res.status(404).json({"message":"User found"})        
        return res.status(200).json(result)
    }
    res.status(400).json({"message":"Unauthorized user"})
})

const Update = catchError(async ( req, res )=>{  
    const Resp = await ValidateUser(req)
    
    const id  = parseInt(req.params.id)   
    if(Resp === "admin"){          
        const Resul = await ValidateUpdateUser(req)
        const result = await Usuarios.update(Resul,{where:{id},returning:true})
        if(!result) return res.status(404).json({"message":"User not Updated"})
        return res.status(200).json({"message":"User Updated successfully"})
    }else{
          const Result = await ValidateUpdateUser(req)
          if(Result.message) return res.status(404).json({"message":`${Result.message}`})
          const Users = await Usuarios.findAll({where:{email:req.user.email}})
          if(Result.path) return res.status(404).json({"message":`${Result.errors}`})
            const result = await Usuarios.update(Result,{where:{id:Users[0].id},returning:true})
        
            if(!result) return res.status(404).json({"message":"User not Updated"})
                return res.status(200).json({"message":"User Updated successfully"})    
        }
         
})


const Login = catchError (async(req, res)=>{
    let Info={}
    const Respuesta = await ValidateLogin(req)
    if(Respuesta.Fiel_error) return res.status(404).json({"message":`${Respuesta.error}`})
   const users = await Usuarios.findOne({where:{email:Respuesta.email}})
   if(!users) return res.status(404).json({"message":"Invalid Information"})
    const isValid = await bcrypt.compare(Respuesta.password, users.password)
   if(!isValid) return res.status(404).json({"message":"Invalid Informatión"})
    if(users.status === '0') {
        Info = {"message":"It is the first login, you must change the password"}
} 
   
    const usuario = {
       email:users.email,
       nombre:users.nombre
    }

    const token = jwt.sign(
        usuario,
        process.env.TOKEN_SECRET,
        { expiresIn:'4h'}
    )
    res.cookie('token', token, {
        httpOnly: true, // No accesible desde JavaScript del cliente
        secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
        sameSite: 'strict', // Protege contra CSRF
        maxAge: 30 * 60 * 1000, // Expira en 30 minutos
        path: '/',               // Cookie disponible en todas las rutas
        domain: 'localhost' 
      });

  return res.status(200).json({usuario, Info, token})
})

const Logged = catchError(async(req, res)=>{

    const Users = await Usuarios.findOne({where:{email:req.user.email}})
    const me={
        name:Users.nombre, 
        apellidos:Users.apellidos, 
        type:Users.tipo,  
        imagen:Users.imagen,
        position:Users.cargo, 
    }
     res.status(200).json(me)
})

const Logout =catchError(async(req,res)=>{

    res.clearCookie('token');
    res.status(200).json({ "message": "Closed Sesión" });
})

module.exports = {
    getAll,
    Create,
    getOne,
    Update,
    Login,
    Logout,
    Logged

}





