import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../../config"
import {useToasts} from 'react-toast-notifications';
import { useDispatch} from "react-redux";
import { authAction } from "../../store/authSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";


function Login() {
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
  
  useEffect(()=>{
    if(user){
      return navigate('/doctor')
    }
  },[user,navigate])

  const {addToast} = useToasts()
  
  const dispatch = useDispatch()
  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    const {email,password} = e.target
    const data = {
      email:email.value,
      password:password.value,
    }
    
    const res = await fetch(`${BASE_URL}/api/v1/auth/login`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data),
      credentials: "include"
    })

    
    const result = await res.json()
    if(!res.ok){
      addToast(result.message,{appearance:'error'})
      throw new Error(result.message)
    }
    Cookies.set('token',result.token)
    dispatch(authAction.login(result))
    navigate('/doctor')
    addToast(result.message,{appearance:'success'})
  }

 
  return (
    <div className=" flex justify-center px-5 sm:px-10 lg:px-32 py-24 relative   items-center">
         
          <form onSubmit={onSubmitHandler} method="POST" className=" relative z-10 max-w-[30rem] bg-white rounded-md space-y-6 shadow-md  border p-10">
            <h1 className="text-2xl font-semibold">Hello! <span className=" text-primaryColor">Welcome</span> Back🎉</h1>
            <input name="email" className=" outline-none border-b-2 w-full h-12" type="email" required={true} placeholder="Enter Your Email" />
            <input name="password" className=" outline-none border-b-2 w-full h-12" required={true} type="password" placeholder="Password" />
            <button type="submit" className=" bg-primaryColor text-white w-full py-3 rounded-md">Login</button>
            <p className=" text-center">Don{`'`}t have an account? <Link to={'/register'} className=" text-primaryColor">Register</Link></p>
          
              <h1 className=" font-semibold">Demo Accounts</h1>
            <div className=" space-y-3">
              <div>
                <p>patient</p>
                <p>email: patient1@gmail.com</p>
                <p>password: 123456</p>
              </div>
              <div>
                <p>doctor</p>
                <p>email: doctor1@gmail.com</p>
                <p>password: 123456</p>
              </div>
              <div>
                <p>admin</p>
                <p>email: admin@gmail.com</p>
                <p>password: 123456</p>
              </div>
            </div>
          </form>
    </div>
  )
}

export default Login