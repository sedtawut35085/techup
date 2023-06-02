import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'

import Auth from '../../configuration/configuration-aws'
import BackgroundAnimate from '../../components/background/bgAnimate.js'

function SignUpForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfPassword, setCfPassword] = useState('')

  const [errors, setErrors] = useState([])
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [errorServerMessage, setErrorServerMessage] = useState(null)
  const [errorRegisterMessage, setErrorRegisterMessage] = useState(null);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState(null);

  const navigate = useNavigate()

  function checkPassword (e) {
    const Pass = e.target.value;
    setPassword(Pass);
    const uppercaseRegExp   = /([A-Z])/;
    const lowercaseRegExp   = /([a-z])/;
    const digitsRegExp      = /([0-9])/;
    const specialCharRegExp = /([#?!@$%^&*-])/;
    const minLengthRegExp   = /.{8,}/;
    const uppercasePassword =   uppercaseRegExp.test(Pass);
    const lowercasePassword =   lowercaseRegExp.test(Pass);
    const digitsPassword    =   digitsRegExp.test(Pass);
    const specialCharPassword = specialCharRegExp.test(Pass);
    const minLengthPassword =   minLengthRegExp.test(Pass);
    setIsErrorPassword(false)
    if(Pass.length === 0){
        setErrorPasswordMessage('Please enter password')
    }else if(!uppercasePassword){
        setErrorPasswordMessage('Must contain at least 1 capital letter')
    }else if(!lowercasePassword){
        setErrorPasswordMessage('Must contain at least 1 lowercase letter')
    }else if(!digitsPassword){
        setErrorPasswordMessage('Must contain at least 1 number')
    }else if(!specialCharPassword){
        setErrorPasswordMessage('Must contain at least 1 special character')
    }else if(!minLengthPassword){
        setErrorPasswordMessage('Password length must be at least 8 characters.')
    }else{
        setIsErrorPassword(true)
        setErrorPasswordMessage(null)
    }
  }

  async function handleSignUp(event) {

    setErrors([])

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      if(email === '') {
        setErrors(errors => [...errors, 'email'])
      } else {
        setErrors(errors => [...errors, 'invalid_email'])
      }
    } else if(!email.includes('@mail.kmutt.ac.th') && !email.includes('@kmutt.ac.th')) {
        setErrors(errors => [...errors, 'kmutt_email'])
    } else if(!isErrorPassword) {
    
    } else if(cfPassword === '') {
        setErrors(errors => [...errors, 'cf_password'])
    } else if(password !== cfPassword) {
        setErrors(errors => [...errors, 'wrong_cf_password'])
    } else {
      await Signup(event)
    }
    event.preventDefault();
  }

  async function Signup(e) {
    e.preventDefault();
    await Auth.signUp({
      username: email,
      password: password,
      attributes: {
          name : null,       
          email: email, 
      }
    })
    .then(() => {
        setErrorRegisterMessage(null)
        setErrorServerMessage(null)
        navigate('/verify-code-email', { state: { email: email,password: password} })
    })
    .catch(err =>{
      if(err.toString().includes('An account with the given email already exists.')){
        setErrorRegisterMessage('email account ' + email + ' already exists.');
      }else{
        setErrorServerMessage('Server Error, please try again.');
      }
    });
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
            <div className="sign-form-title">
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
                  <div className='f-xs color-5'>{errorRegisterMessage}</div>              
              </div> 
              <div className="form-group pb-4">
                  <label className="f-md color-black pb-2" htmlFor="password">Password</label>
                  <input
                  type="password"
                  id="password"
                  className="sign-form-input"
                  value={password}
                  onChange={(e) => checkPassword(e)}
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
                  <div className='f-xs color-5'>{errorPasswordMessage}</div>
              </div>
              <div className="form-group pb-4">
                  <label className="f-md color-black pb-2" htmlFor="cf-password">Confirm password</label>
                  <input
                  type="password"
                  id="cf-password"
                  className="sign-form-input"
                  value={cfPassword}
                  onChange={event => setCfPassword(event.target.value)}
                  onClick={() => {removeError('cf_password');removeError('wrong_cf_password')}}
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
              <div className="sp-vertical pt-3"></div>
              <div className="px-4 text-center py-3">
                <span className="color-5 h8 fw-600 text-center">{errorServerMessage}</span>
              </div>
              <button type="submit" className="sign-form-button">Sign up</button>
            </form>
            <div className="sp-vertical py-3"></div>
            <span className="nav-sign-page">Already have an account?<Link to="/" className="underline color-1">Sign in</Link></span>
          </div>
        </div>
        <div className="sign-info d-none d-lg-block">
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