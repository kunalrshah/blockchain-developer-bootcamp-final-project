import React, { useState } from 'react'
import loginImage from "./../assets/PearlZZ-Logo.jpg";
import metamaskImage from "./../assets/metamask.png";
import { useDispatch } from "react-redux";
import { doLogin } from "../store/actions";
import { Redirect } from 'react-router';

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');

  const onUsernameInput = (e) => {
    const re = /^[0-9\b]+$/;
    if (re.test(e.target.value)) {
      setUsername(e.target.value);
    }
  };

  const onPasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    if (username === 'admin' && password === 'admin') {
      dispatch(doLogin());
      // <Redirect to="/issuer" />
    }
  }
  return (
    <div className="Login">
      <div className="content mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={loginImage} alt="Image" className="img-fluid" />
            </div>
            <div className="col-md-6 contents">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3>Pearlzz</h3>
                    <p className="mb-4">
                      Earn Everywhere, Spend Anywhere
                    </p>
                  </div>
                  <label htmlFor="username">Username</label>
                  <div className="form-group first mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={onUsernameInput}
                    />
                  </div>
                  <label htmlFor="password">Password</label>
                  <div className="form-group last mb-4">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={onPasswordInput}
                    />
                  </div>

                  {/* <div className="d-flex mb-1 flex-direction-row align-items-center">
                      <label className="control control--checkbox mb-2">
                        <span className="caption">Remember me</span>
                        <input type="checkbox" defaultChecked="checked" />
                        <div className="control__indicator"></div>
                      </label>
                     
                    </div>
                    <span className="ml-auto mb-3 d-flex">
                        <a href="#" className="forgot-pass">
                          Forgot Password
                        </a>
                      </span> */}
                  <br />
                  <button
                    className="btn btn-block btn-primary btn-lg"
                    onClick={onSubmit}
                  >Log In</button>

                  <span className="d-block text-left my-4 text-muted">
                    &mdash; or login with &mdash;
                  </span>

                  <div className="social-login d-flex align-items-center">
                    <a style={{'cursor': 'pointer'}} onClick={()=>window.ethereum.enable()} >
                    <img src={metamaskImage} alt="Image" width="50" className="img-fluid pe-2 border-end me-3" />
                    </a>
                    <a href="#" className="facebook me-3">
                      <span className="icon-facebook fs-3">
                        <i className="bi bi-facebook"></i>
                      </span>
                    </a>
                    <a href="#" className="twitter me-3">
                      <span className="icon-twitter fs-3">
                        <i className="bi bi-twitter"></i>
                      </span>
                    </a>
                    <a href="#" className="google me-3">
                      <span className="icon-google fs-3">
                        <i className="bi bi-google"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
