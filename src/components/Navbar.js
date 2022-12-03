import React, { useContext } from 'react'
import { Link, useLocation ,useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import  '../css/Navbar.css'
import { AppContext } from '../context/Context';


function Navbar() {
  let location = useLocation()
  let navigate=useNavigate()
  const context=useContext(AppContext)
  const {isLogin,setIsLogin}=context;
  useEffect(() => {
    console.log(location.pathname)
  }, [location])
  const logOut=()=>{
    localStorage.removeItem('id')
    setIsLogin(false);
    navigate('/login')
  }


  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
         <Link className="navbar-brand" to="/DLocker">DgLocker</Link>
        
          <div className="navbar-container">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link  ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/DLocker">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            { !isLogin?
              <form className="d-flex">
                <Link role="button" to="/login" className="btn ">Login</Link>
                <Link role="button" to="/signup" className="btn " >SignUp</Link>
              </form>:<button className="btn btn-primary bh" onClick={logOut}>Logout</button>
            }
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar