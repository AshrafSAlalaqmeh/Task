import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFullName, setLogin, setUserId } from '../../redux/reducers/auth'
import "./style.css"



const Login = () => {
const [email, setEmail] = useState('')
const [pass, setPass] = useState('')
const dispatch = useDispatch()
 const navigate= useNavigate()

const handelLogin = ()=>{
  axios.post("http://localhost:5000/users/login",{
    email,
    pass
  })
.then((result)=>{
dispatch(setLogin(result.data.Token))
dispatch(setUserId(result.data.userId))
dispatch(setFullName(result.data.Full_name))
navigate('/Tasks')

})
.catch((err)=>{
console.log(err.response.data.massage);
})
}


  return (
    <div className='contanir-login body'>
    <div className='header'>
    <h3>Hello</h3>
    <p>Sign Into Your Accont</p>
    </div>


   <div className='input-Register'>

    <div class="form-outline mb-4">
   <input type="email" 
   placeholder='Email'
   id="registerName" class="form-control inp"
   onChange={(e)=>{setEmail(e.target.value)}}
   />
   </div>

   <div class="form-outline mb-4">
   <input type="password" 
   placeholder='Password'
   id="registerEmail" class="form-control inp"
   onChange={(e)=>{setPass(e.target.value)}}
   />
</div>

</div>


<div className='footer'>
   <button className='button-Register' onClick={()=>{handelLogin()}}>LOG IN</button>

   <p className='go-login' onClick={()=>{navigate('/')}}>Don't have an account ?</p>
   </div>

    </div>
  )
}

export default Login