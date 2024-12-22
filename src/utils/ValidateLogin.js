const yup = require('yup')

const schema = yup.object().shape({
email: yup.string().email().required(),
password: yup.string().required().min(6)
})

const ValidateLogin = async(req)=>{

    try{
         const results = await schema.validate(req.body)
         return results
    }catch(error){
        return DataError={
          Fiel_error:error.path,
          error:error.errors
        }

    }
}

module.exports={ValidateLogin}



