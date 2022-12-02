import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/Context';
import '../css/Login.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Login(props) {
  const context = useContext(AppContext);
  const navigate=useNavigate();
  
  const [log, setLog] = useState({ email: "", password: "" });

  const { isLogin, setIsLogin, register, login } = context;
  useEffect(() => {
     if(isLogin){
      navigate("/")
     }
  }, [])
  
 
  const handleSubmit = async (e) => {
    e.preventDefault();
   const val= await login(log.email, log.password);
    setLog({ email: "", password: "" })
    console.log(val)
    if(val)navigate("/")
  }
  const onchange = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value })
  }

  
  
  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className='form-main'>
      <div className="mb-3 dflex">
        <label htmlFor="email" className="form-label">Email address</label>

        <input type="email" className="form-control" id="email" name="email" onChange={onchange} value={log.email}  />

      </div>
      <div className="mb-3 dflex">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name="password" onChange={onchange} value={log.password} autoComplete="off" />
      </div>

      <button type="submit" className="btn2 btn2-primary">Submit</button>
    </form>
    </div>
  )
}

export default Login