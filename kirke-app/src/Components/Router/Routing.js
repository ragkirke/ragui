import React from 'react';
import { Routes, Route  } from 'react-router-dom';
import SignIn from '../Login/LoginPage';
import SignUp from '../Register/SignUp';
import Dashboard  from '../Dashboard/Dashboard';
function Routing() {
  return (
    <>
     
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/landing" element={<Dashboard />} />
        </Routes>
        
       
     
    </>
  );
}

export default Routing;