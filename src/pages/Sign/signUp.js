import React, { useState } from 'react';

import BackgroundAnimate from '../../components/background/bgAnimate.js'

function SignUpForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfPassword, setCfPassword] = useState('')

  const [errors, setErrors] = useState([])

  function handleSignUp(event) {

    setErrors([])

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        if(email === '') {
            setErrors(errors => [...errors, 'email'])
        } else {
            setErrors(errors => [...errors, 'invalid_email'])
        }
    } else if(!email.includes('@mail.kmutt.ac.th')) {
        setErrors(errors => [...errors, 'kmutt_email'])
    } else if(password === '') {
        setErrors(errors => [...errors, 'password'])
    } else if(cfPassword === '') {
        setErrors(errors => [...errors, 'cf_password'])
    } else if(password !== cfPassword) {
        setErrors(errors => [...errors, 'wrong_cf_password'])
    } else {
        window.location.href = '/sign-up/select-role'
    }

    event.preventDefault();
  }

  function removeError(error) {
    setErrors((errors) => 
      errors.filter((item) => item !== error)
    )
  }

  return (
    <div className="color-black">
      <div className="sign">
      <div className="sign-up-form">
          <div className="sign-up">
            <div className="sign-form-title px-4">
              <span className="color-black f-xl fw-800">Sign up to </span>
              <span className="color-1 f-xl fw-800">TECHUP</span>
            </div>          
            <form onSubmit={handleSignUp}>
              <div className="form-group pb-4">
                  <label className="f-md color-black pb-2" htmlFor="email">Email</label>
                  <input
                  type="text"
                  id="email"
                  className="sign-form-input"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  onClick={() => {removeError('email'); removeError('invalid_email'); removeError('kmutt_email')}}
                  style={
                    errors.includes('email') ||
                    errors.includes('invalid_email') ||
                    errors.includes('kmutt_email')
                    ? {borderColor: "#FF333D"}
                    : {}
                  }
                  />
                  {
                    errors.includes('email')
                    ? <label className="f-xs color-5" htmlFor="email">Please enter your email</label>
                    : errors.includes('invalid_email')
                    ? <label className="f-xs color-5" htmlFor="email">Please enter a valid email address</label>
                    : errors.includes('kmutt_email')
                    ? <label className="f-xs color-5" htmlFor="email">Please enter a KMUTT email address</label>
                    : null
                  }                  
              </div>
              <div className="form-group pb-4">
                  <label className="f-md color-black pb-2" htmlFor="password">Password</label>
                  <input
                  type="password"
                  id="password"
                  className="sign-form-input"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  onClick={() => {removeError('password')}}
                  style={
                    errors.includes('password')
                    ? {borderColor: "#FF333D"}
                    : {}
                  }
                  />
                  {
                    errors.includes('password')
                    ? <label className="f-xs color-5" htmlFor="email">Please enter your password</label>
                    : null
                  }
              </div>
              <div className="form-group pb-4">
                  <label className="f-md color-black pb-2" htmlFor="cf-password">Confirm password</label>
                  <input
                  type="password"
                  id="cf-password"
                  className="sign-form-input"
                  value={cfPassword}
                  onChange={event => setCfPassword(event.target.value)}
                  onClick={() => {removeError('cf_password')}}
                  style={
                    errors.includes('cf_password') ||
                    errors.includes('wrong_cf_password') 
                    ? {borderColor: "#FF333D"}
                    : {}
                  }
                  />
                  {
                    errors.includes('cf_password')
                    ? <label className="f-xs color-5" htmlFor="cf-email">Please confirm your password</label>
                    : errors.includes('wrong_cf_password')
                    ? <label className="f-xs color-5" htmlFor="cf-email">Password not matching</label>
                    : null
                  }
              </div>
              <div className="sp-vertical py-3"></div>
              <button type="submit" className="sign-form-button">Sign up</button>
            </form>
            <div className="sp-vertical py-3"></div>
            <span className="d-flex jc-center f-md">Already have an account?<a href="/" className="underline color-1 ps-2">Sign in</a></span>
          </div>
        </div>
        <div className="sign-info">
          <div className="d-flex mb-4 jc-center">
            <img className="sign-logo" alt="logo" width="250px" height="214px" src="/assets/images/logo/logo(white).png" />
          </div>
          <p className="f-lg text-center color-white">
            Application for improvement Computer Science skill.<br/> Made for KMUTT Applied Computer Science Students.
          </p>
        </div>
      </div>
      <BackgroundAnimate />
    </div>
    
  );
}

export default SignUpForm;