import '../css/Home.css'
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import Login from './Login';
import Context, { AppContext } from '../context/Context';
import Profile from './Profile';


function Home() {

    const context = useContext(AppContext);
    const {isLogin, setIsLogin } = context;
    // useEffect(() => {
        
    // }, [])

    return (
        <div className='main'>
            <Profile/>
        </div>
    )
}

export default Home