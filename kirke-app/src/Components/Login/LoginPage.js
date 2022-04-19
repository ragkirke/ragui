import React, { useState } from 'react';
import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = data;

  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <>
      <div className="login_Container">
        <h3>Login</h3>
        <form className="mt-3 p-3" onSubmit={submitHandler}>
          <div className="form-group ">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              value={email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={inputHandler}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={inputHandler}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
