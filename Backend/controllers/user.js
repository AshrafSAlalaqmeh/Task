const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const {pool} =require("../models/database")

const register = async (req ,res)=>{
const {Full_name, email ,pass }=req.body
const hashedPassword= await bcrypt.hash(pass , 10);
const values =[Full_name, email,hashedPassword]
const query =`INSERT INTO users(Full_name, email ,pass )VALUES ($1,$2,$3) RETURNING *;`
pool.query(query , values)
.then((result)=>{
    res.status(201).json({
     success: true,
      massage: "Account Created Successfully",
      result :result
    })
})
.catch((err)=>{
    console.log(err);
    res.status(404).json({
      success: false,
      massage: "The email already exists",
      error:err
    })
})
}

const login =  (req ,res)=>{
    const {email , pass}=req.body;
    const values=[email]
    const query=`SELECT * FROM users WHERE email=$1;`
    pool.query(query , values)
    .then(async (result)=>{
        console.log(result);
        if(result.rows.length === 0){
            res.status(404).json({
                success: false,
                massage:"Email Not Found"
            })
        }
        else{
          const checkPassword = await bcrypt.compare(pass ,result.rows[0].pass )
          if (!checkPassword) {
            res.status(404).json({
                success :false,
                massage : "The password you’ve entered is incorrect"
            })
          }
          const payload ={
            Full_name : result.rows[0].full_name ,            
            userId: result.rows[0].id
           }
          
           const SECRET = 'keySecret'
           const options ={
            expiresIn :"1h"
           }
           const token = await jwt.sign (payload,SECRET,options)
           console.log(token);
           res.status(200).json({
            message : 'Successed Login' ,
            Token : token ,
            Full_name : result.rows[0].full_name ,
            userId: result.rows[0].id 
           })



        }
    })
    .catch((err)=>{
        res.status(404).json({
            message:"Error Server" , 
            Error :err})
    })
}

module.exports={register,login}