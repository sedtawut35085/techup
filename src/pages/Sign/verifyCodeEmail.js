import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useNavigate } from 'react-router-dom'
import BackgroundAnimate from '../../components/background/bgAnimate.js'
import Auth from '../../configuration/configuration-aws'

function VerifyCodeEmailForm() {

  const { state } = useLocation();
  const { email, password } = state || ''
  const [ code, setCode] = useState('');
  const [ errorCodeMessage, setErrorCodeMessage] = useState(null);
  const [ isResendCode, setIsResendCode] = useState(false)
  let isConfirmcode

  const navigate = useNavigate()

  async function verifyOTP (otp) {
    setCode(otp);
    if(otp.length === 6){
        await Auth.confirmSignUp( email, otp, {
            forceAliasCreation: true
        }).then(async () => 
            {
                setErrorCodeMessage(null)
                isConfirmcode = true
            })
        .catch(err => 
            {
                isConfirmcode = false
                setErrorCodeMessage('!! Wrong Code, please check and enter again')
            }
        );
        if(isConfirmcode){
            await Auth.signIn(email, password)
            .then(async () => {
                await Auth.currentSession()
                .then(res => {
                  setIsResendCode(false)
                  navigate('/select-role')
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));   
        }   
    }
   } 
   
  async function resendConfirmationCode(e) {
    try {
        await Auth.resendSignUp(email);
        setIsResendCode(true)
    } catch (err) {
        console.log('error resending code: ', err);
    }
   }

  return (
    <div className="color-black">
      <div className="sign">
      <div className="sign-up-form">
          <div className="sign-up">
            <div className="sign-form-title text-center">
              <span className="color-black f-xl fw-800">Enter security code with </span>
              <span className="color-1 f-xl fw-800">TECHUP<br></br></span>
              
            </div>          
              <div className="form-group pb-4 pt-5 mt-5">
                   <OtpInput
                        value={code} onChange={(e) => verifyOTP(e)}
                        numInputs={6}
                        isInputNum={true}
                        required
                        inputStyle={{
                            width: "60px",
                            height: "60px",
                            margin: "0 5px",
                            fontSize: "1rem",
                            borderRadius: 4,
                            border: "1px solid rgba(0,0,0,0.3)"
                        }}
                    />              
              </div>
            <div className="px-4 text-center">
              <span className="color-5 h10 fw-600 text-center ">{errorCodeMessage}<br></br></span>
            </div>
            <div className="sp-vertical py-4"></div>
            <div className="px-4 text-center mt-5">
              <span className="color-black h8 fw-600 text-center">Please check your emails for a message with your code. Your code is 6 numbers long.</span>
            </div>
            {isResendCode === false?
              <>
                  <div className="px-4 text-center pt-3">
                      <span className="color-5 h8 fw-600 text-center ">Didn't get a code?<br></br></span>
                      <span className="color-5 h8 fw-600 text-center underline " role="button" onClick={resendConfirmationCode}>Click to resend the code</span>
                  </div>
              </>
              :                        
              <>
                    <div className="px-4 text-center pt-3">
                      <span className="color-5 h8 fw-600 text-center ">The code has been sent to your email successfully.</span>
                  </div>
              </>
            }
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

export default VerifyCodeEmailForm;