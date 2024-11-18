import React from 'react'

const AuthButton = ({ handleSignUpClick, handleSignInClick, toggle ,isMobileMenu}) => {
    let className='btn-outline-primary';
    if(isMobileMenu){
        className='btn-outline-primary';
    }else{
        if(!toggle){
            className='btn-outline-white'
        }else{
            className='btn-outline-primary'
        }
    }
    return (
      <div className="flex gap-2">
        <button
          onClick={()=>handleSignInClick()}
          className={`${className}`}
        >
          Sign In
        </button>
        <button
          onClick={()=>handleSignUpClick()}
          className="btn-primary"
        >
          Sign Up
        </button>
      </div>
    )
  }

export default AuthButton