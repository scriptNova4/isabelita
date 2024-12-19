const catchError = require('../utils/catchError');
const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const { json } = require('sequelize');
const {ValidateUser}  = require('../utils/ValidateUser');

const getAll = catchError(async (req, res) => {
    const resp = await ValidateUser(req)
    console.log(resp)
    const Users = await Usuarios.findOne({where:{email:req.user.email}}) 
     if(Users.tipo === "admin"){
         const result = await Usuarios.findAll()
        if(!result) return res.status(400).json(result)
            return res.status(200).json(result)
     }
     res.status(400).json({"message":"Unauthorized user"})    
});

const Create = catchError(async (req, res) => {
    const Users = await Usuarios.findOne({where:{email:req.user.email}}) 
    if(Users.tipo ==="admin"){
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
    }
    res.status(400).json({"message":"Unauthorized user"})
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
   const users = await Usuarios.findOne({where:{email}})
   if(!users) return res.status(404).json({"message":"Invalid Information"})
    const isValid = await bcrypt.compare(password, users.password)
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
    res.status(200).json({ "message": "Sesión cerrada" });
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