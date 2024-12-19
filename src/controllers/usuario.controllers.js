const catchError = require('../utils/catchError');
const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const getAll = catchError(async (req, res) => {
       
    const result = await Usuarios.findAll()
   if(!result) return res.status(400).json(result)
    
    return res.status(200).json(result)
});

const Create = catchError(async (req, res) => {
    console.log(req.body)
   const { nombre, apellidos, tipo, user, password, imagen, cargo, email } = req.body
   const setPassword = await bcrypt.hash(password, 10)
   const newUser={
    nombre,
    apellidos,
    tipo,
    user,
    password : setPassword,
    imagen,
    cargo,
    status:0,
    email
   }
   const result = await Usuarios.create(newUser)
       if(!result) res.status(404).json({"message":"User not created"})
        return res.status(200).json({"message":"User created successfully"})
})


const getOne = catchError (async ( req , res )=>{
  
    const id = parseInt(req.params.id)
    
    const result = await Usuarios.findOne({where:{id}})    
    if(!result) return res.status(404).json({"message":"User found"})        
    return res.status(200).json(result)
})

const Update = catchError(async ( req, res )=>{
   
     const id  = parseInt(req.params.id)
     
     const { nombre, apellidos, tipo, user, password, imagen, cargo, status,email } = req.body
     const newUser={
        nombre,
        apellidos,
        tipo,
        user,
        imagen,
        cargo,
        status,
        email
       }
       if(password){
        console.log(password)
        const setPassword = await bcrypt.hash(password, 10)
         newUser.password=setPassword;
         newUser.status='1'
     }       
       const result = await Usuarios.update(newUser,{where:{id},returning:true})
       if(!result) return res.status(404).json({"message":"User not Updated"})

        return res.status(200).json({"message":"User Updated successfully"})

})

const Login = catchError (async(req, res)=>{
    let Info={}
    const { email, password } = req.body
   console.log("body",req.body)
   const users = await Usuarios.findOne({where:{email}})
   if(!users) return res.status(404).json({"message":"Invalid Information"})
    const isValid = await bcrypt.compare(password, users.password)
   if(!isValid) return res.status(404).json({"message":"Invalid Information"})
     console.log(users.status)
    if(users.status === '0') {
        Info = {"message":"Es el primer Incio de session debes Cambiar el password"}
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

const Logout =catchError(async(req,res)=>{

    res.clearCookie('token');
    res.status(200).json({ "message": "Sesión cerrada" });
})

module.exports = {
    getAll,
    Create,
    getOne,
    Update,
    Login,
    Logout

}