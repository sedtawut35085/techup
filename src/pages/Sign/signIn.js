import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io'
import Auth from '../../configuration/configuration-aws'
import BackgroundAnimate from '../../components/background/bgAnimate.js'
import { useNavigate } from 'react-router-dom'
import { getStudent } from '../../service';

function SignInForm() {

  const [isForgot, setIsForgot] = useState(false);
  const [isSent, setIsSent] = useState(false)
  const [isSentSuccess, setIsSentSuccess] = useState(false)
  const [isReSend, setIsReSend] = useState(false)

  const [email, setEmail] = useState('');
  const [emailForgot, setEmailForgot] = useState('')
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [isForgetPasswordMessage, setIsForgetPasswordMessage] = useState(false);
  const [isErrorSignIn, setIsErrorSignIn] = useState(false);
  const [keep, setKeep] = useState(false);

  const [errors, setErrors] = useState([])
  const [errorCodeMessage, setErrorCodeMessage] = useState(null);

  const navigate = useNavigate()

  function clear() {
    setErrors([])
    setEmail('')
    setEmailForgot('')
    setCode('')
    setPassword('')
    setKeep(false)
    setIsReSend(false)
    setIsForgetPasswordMessage(false)
    setIsErrorSignIn(false)
    setErrorCodeMessage('')
  }

  async function handleSignIn(event) {
    setErrors([])
    setIsErrorSignIn(false)
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      if(email === '') {
        setErrors(errors => [...errors, 'email'])
      } else {
        setErrors(errors => [...errors, 'invalid_email'])
      }
    } else if(!email.includes('@mail.kmutt.ac.th') && !email.includes('@kmutt.ac.th')) {
      setErrors(errors => [...errors, 'kmutt_email'])
    } else if(password === '') {
      setErrors(errors => [...errors, 'password'])
    }else{
      await Signin(event)
    }
    event.preventDefault();
  }

  async function handleSubmitForgetEmail(event) {
    setErrors([])
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailForgot))) {
      if(emailForgot === '') {
        setErrors(errors => [...errors, 'fg_email'])
      } else {
        setErrors(errors => [...errors, 'fg_invalid_email'])
      }
    } else if(!emailForgot.includes('@mail.kmutt.ac.th')) {
      setErrors(errors => [...errors, 'fg_kmutt_email'])
    } else {
      await Forgetemail(event)
    }
    event.preventDefault();
  }

  async function handleSubmitNewPassword(event) {
   
  }

  async function Forgetemail (e){
    e.preventDefault();
    setIsSent(true)
  }

  async function Signin (e){
    e.preventDefault();
    await Auth.signIn(email, password)
    .then(async () =>  {
      if(email.includes('@mail.kmutt.ac.th')){
        //student
        let res = await getStudent()
        console.log('res ',res[0])
        if(res[0] === undefined){
          navigate('/select-role')
        }else{
          navigate('/home')
        }
      }else{
        //professor
      }
    })
    .catch(err => {
      setIsErrorSignIn(true)
    });   
  }

  function removeError(error) {
    setErrors((errors) => 
      errors.filter((item) => item !== error)
    )
  }

  async function resentcode(e) {
  }

  async function handleCodeChange(event) {
  };

  return (
    <div className="color-black">
      <div className="sign">
        <div className="sign-info">
          <div className="d-flex mb-4 jc-center">
            <img className="sign-logo" alt="logo" width="250px" height="214px" src="/assets/images/logo/logo(white).png" />
          </div>
          <p className="f-lg text-center color-white">
            Application for improvement Computer Science skill.<br/> Made for KMUTT Applied Computer Science Students.
          </p>
        </div>
        <div className="sign-in-form">
          <div className="sign-in" style={!isForgot && !isSent ? {} : {width: 0, opacity: 0}}>
            <div className="sign-form-title">
              <span className="color-black f-xl fw-800">Welcome to </span>
              <span className="color-1 f-xl fw-800">TECHUP</span>
            </div>          
            <form onSubmit={handleSignIn}>
              <div className="form-group pb-5">
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
              <div className="sign-form-bottom d-flex jc-btw pb-5">
                <div className="d-flex">
                  <input 
                  type="checkbox" 
                  id="keep"
                  className="sign-form-checkbox"
                  value={keep}
                  onChange={() => setKeep((prev) => !prev)}
                  />
                  <label className="f-sm color-black ps-2" htmlFor="keep">Keep me logged in</label>
                </div>
                <a className="f-sm text-end" href="/#" onClick={() => {setIsForgot(true); clear()}}>Forgot password ?</a>
              </div>
              {isErrorSignIn === false?
                    <>
                       
                    </>
                    :                        
                    <>
                       <div className="col-12 d-flex jc-center pb-2">
                          <label className="f-sm color-5 text-center" htmlFor="error">The email address you entered isn't connected to an account or password not correct.</label>
                      </div>
                    </>
              } 
              <div className="sp-vertical"></div>
              <button type="submit" className="sign-form-button">Sign In</button>
            </form>
            <div className="sp-vertical py-3"></div>
            <span className="d-flex jc-center f-md">Don’t have an account?<a href="/sign-up" className="underline color-1 ps-2">Sign up</a></span>
          </div>
          <div className="forgot-password" style={isForgot && !isSent ? {} : {width: 0, opacity: 0}}>
            <div>
              <span className="color-black f-xl fw-800">Forgot your password?</span>
              <p className="color-black f-smd py-4">
                We’ll email you instructions to reset your password. If you don’t have access to your email anymore, please <a className="color-5 underline" href="/#">contact administrator.</a>
              </p>
            </div>          
            <form onSubmit={handleSubmitForgetEmail}>
              <div className="form-group pb-5">
                  <label className="f-md color-black pb-2" htmlFor="email-forgot">Email</label>
                  <input
                  required
                  type="text"
                  id="email-forgot"
                  className="sign-form-input"
                  value={emailForgot}
                  onChange={event => setEmailForgot(event.target.value)}
                  onClick={() => {removeError('fg_email'); removeError('fg_invalid_email'); removeError('fg_kmutt_email')}}
                  style={
                    errors.includes('fg_email') ||
                    errors.includes('fg_invalid_email') ||
                    errors.includes('fg_kmutt_email')
                    ? {borderColor: "#FF333D"}
                    : {}
                  }
                  />
                  {
                    errors.includes('fg_email')
                    ? <label className="f-xs color-5" htmlFor="email">Please enter your email</label>
                    : errors.includes('fg_invalid_email')
                    ? <label className="f-xs color-5" htmlFor="email">Please enter a valid email address</label>
                    : errors.includes('fg_kmutt_email')
                    ? <label className="f-xs color-5" htmlFor="email">Please enter a KMUTT email address</label>
                    : null
                  } 
              </div>
              <div className="sp-vertical"></div>
              {isForgetPasswordMessage === false?
                    <>
                       
                    </>
                    :                        
                    <>
                      <div className="px-4 text-center pb-5">
                          <span className="f-m color-5">Attempt limit exceeded, please try after some time.</span>
                      </div>
                    </>
              } 
              <button type="submit" className="sign-form-button">
                  Submit
              </button>
              <a className="color-black f-md d-flex jc-center ai-center pt-4" href="/#" onClick={() => setIsForgot(false)}>
                <IoIosArrowBack size="1.5rem" className="color-black me-1" />
                Return to&nbsp;
                <span className="color-1 underline">Login</span>
              </a>
            </form>
          </div>
          <form onSubmit={handleSubmitNewPassword}>
            <div className="has-sent" style={isForgot && isSent ? {} : {width: 0, opacity: 0}}>
                {isSentSuccess === false?
                    <>
                      <div>
                        <span className="color-black f-xl fw-800">Enter security code</span>
                        <p className="color-black f-smd py-4">Please check your emails for a message with your code. Your code is 6 numbers long.</p>
                      </div>
                      <div className="form-group pb-4">
                            <label className="f-md color-black pb-2" htmlFor="password">Code</label>
                            <input
                            required
                            type="number"
                            id="code"
                            className="sign-form-input"
                            maxLength={5}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            />
                            <div className='f-xs color-5'> {errorCodeMessage}</div>
                        </div>
                  
                      
                      <button className="sign-form-button mt-4" type='submit'>Submit</button>  
                      {/* <button className="sign-form-button" onClick={() => {setIsForgot(false); setIsSent(false)}}>Submit</button>          */}
                      <div className="sp-vertical py-3"></div>
                      {isReSend === false?
                        <>
                             <span className="d-flex jc-center f-md">Don’t received the link<a href="/#" className="underline color-1 ps-2" onClick={(e) => resentcode(e)}>Resend</a></span>
                        </>
                        :                        
                        <>
                            <div className="px-4 text-center">
                                <span className="d-flex jc-center f-md color-5">successfully sended code again.</span>
                            </div>
                        </>
                      } 
                    </>
                    :                        
                    <>
                      <div>
                        <span className="color-4 f-xl fw-800">Successfully changed password</span>
                        <a className="color-black f-md d-flex pt-4" href="/#" onClick={() => {setIsForgot(false); setIsSentSuccess(false); setIsSent(false); clear()}}>
                          Return to&nbsp;
                          <span className="color-1 underline">Login</span>
                        </a>
                      </div>
                    </>
              }
            </div>
          </form>
        </div>
      </div>
      <BackgroundAnimate />
    </div>
  );
}

export default SignInForm;