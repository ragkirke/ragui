import React from 'react';
import { Routes, Route  } from 'react-router-dom';
import SignIn from '../Login/LoginPage';
import SignUp from '../Register/SignUp';

function Routing() {
  return (
    <>
     
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
        
       
     
    </>
  );
}

export default Routing;