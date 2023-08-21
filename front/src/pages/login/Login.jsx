import React, { useState } from 'react'
import useLogin from './logic/useLogin';
import { useNavigate } from 'react-router-dom';

const Login = () => {
     const navigate = useNavigate();
    const { loginSubmit,
      setEmail,
      emailError,
      setPassword,
      passwordError} = useLogin()
      
    // if (userToken) navigate('/');

    return (
      <div className="App">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-4">
              <form id="loginform" onSubmit={loginSubmit}>
                <div className="form-group  ">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="EmailInput"
                    name="EmailInput"
                    aria-describedby="emailHelp"
                    placeholder="Enter username"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <small id="emailHelp" className="text-danger form-text">
                    {emailError}
                  </small>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <small id="passworderror" className="text-danger form-text">
                    {passwordError}
                  </small>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
}

export default Login