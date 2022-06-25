import React from "react";

import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGoogle,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const LoginRegister = () => {
  return (
    <div className="login-register__container login">
      <div className="row">
        <div className="column-50 align-items-center flex-column register">
          <div className="form-wrapper align-items-center">
            <div className="form register">
              <div className="input-group">
                <FontAwesomeIcon className="icon" icon={faUser} />
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-group">
                <FontAwesomeIcon className="icon" icon={faEnvelope} />
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-group">
                <FontAwesomeIcon className="icon" icon={faLock} />
                <input type="password" placeholder="Password" />
              </div>
              <div className="input-group">
                <FontAwesomeIcon className="icon" icon={faLock} />
                <input type="password" placeholder="Confirm password" />
              </div>
              <button>Sign up</button>
              <p className="sign_in__text">
                <span>Already have an account?</span>{" "}
                <b onClick={() => {}} className="pointer">
                  Sign in here
                </b>
              </p>
            </div>
          </div>
          <div className="form-wrapper">
            <div className="social-list align-items-center register">
              <div className="align-items-center facebook-bg">
                <FontAwesomeIcon className="icon" icon={faFacebook} />
              </div>
              <div className="align-items-center google-bg">
                <FontAwesomeIcon className="icon" icon={faGoogle} />
              </div>
              <div className="align-items-center twitter-bg">
                <FontAwesomeIcon className="icon" icon={faTwitter} />
              </div>
              <div className="align-items-center insta-bg">
                <FontAwesomeIcon className="icon" icon={faInstagram} />
              </div>
            </div>
          </div>
        </div>
        <div className="column-50 align-items-center flex-column login">
          <div className="form-wrapper align-items-center">
            <div className="form login">
              <div className="input-group">
                <FontAwesomeIcon className="icon" icon={faUser} />
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-group">
                <FontAwesomeIcon className="icon" icon={faLock} />
                <input type="password" placeholder="Password" />
              </div>
              <button>Sign in</button>
              <p>
                <b className="forgot_password__text pointer">
                  Forgot password?
                </b>
              </p>
              <p className="sign_up__text">
                <span>{"Don't have an account?"}</span>{" "}
                <b onClick={() => {}} className="pointer">
                  Sign up here
                </b>
              </p>
            </div>
          </div>
          <div className="form-wrapper">
            <div className="social-list align-items-center login">
              <div className="align-items-center facebook-bg">
                <FontAwesomeIcon className="icon" icon={faFacebook} />
              </div>
              <div className="align-items-center google-bg">
                <FontAwesomeIcon className="icon" icon={faGoogle} />
              </div>
              <div className="align-items-center twitter-bg">
                <FontAwesomeIcon className="icon" icon={faTwitter} />
              </div>
              <div className="align-items-center insta-bg">
                <FontAwesomeIcon className="icon" icon={faInstagram} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row content-row">
        <div className="column-50 align-items-center flex-column">
          <div className="img login">
            <div className="text login">
              <h2>Sign In</h2>
            </div>
            <Image
              src="/assets/login.svg"
              alt="Login illustration"
              width={550}
              height={550}
            />
          </div>
        </div>
        <div className="column-50 align-items-center flex-column">
          <div className="img register">
            <div className="text register">
              <h2>Sign Up</h2>
            </div>
            <Image
              src="/assets/register.svg"
              alt="Register illustration"
              width={550}
              height={550}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;