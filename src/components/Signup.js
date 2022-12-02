import React, { useContext, useState } from 'react'
import { AppContext } from '../context/Context';
import '../css/Login.css'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const context = useContext(AppContext);
    const navigate=useNavigate();

    const [user, setUser] = useState({ userName: "", email: "", password: "" })
    const { isLogin, setIsLogin, register, login } = context;
    const onchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const signUp = (e) => {
        e.preventDefault();
        register(user.userName, user.email, user.password)
        setUser({ userName: "", email: "", password: "" })
         navigate('/login')
    }
    return (
        <div className='form-container'>
            <form onSubmit={signUp} className='form-main'>
                <div className="mb-3 dflex">
                    <label htmlFor="userName" className="form-label">User Name</label>
                    <input type="text" className="form-control" id="userName" name="userName" onChange={onchange} value={user.userName}  />

                </div>
                <div className="mb-3 dflex">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onchange} value={user.email} />

                </div>
                <div className="mb-3 dflex">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onchange} value={user.password} autoComplete="off" />
                </div>

                <button type="submit" className="btn2 btn2-primary">Submit</button>
            </form >
        </div >
    )
}

export default Signup