import './App.css';
import React from 'react';
import Context from './context/Context';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import About from './components/About';


function App() {
  return (
    <Context>
      <Router>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </Context>

  );
}

export default App;
