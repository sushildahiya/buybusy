import React, { useRef, useState } from 'react'
import styles from './signin.module.css'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { NavLink, useNavigate } from 'react-router-dom'
import { useValueAuth } from '../../context/authContext'
function Signup() {
  const [error,setError]=useState(null)
  const emailRef = useRef()
  const passwordRef = useRef()
  const nameRef = useRef()
  const auth = getAuth()
  const navigate = useNavigate()
  const {handleAuthentication}= useValueAuth()
  const handleSignUp =async ()=>{
    try{
       const response=await createUserWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value)
       const data = await response._tokenResponse
       handleAuthentication({
        userId: data.localId,
        email: data.email, 
        token: data.idToken
      })
      navigate('/')
    }catch(error){
      setError(error.message)
    }
  }
  return (
    <div className={styles.signinContainer}>
    <div className={styles.signinContent}>
    <h1>
      Sign Up
    </h1>
    <div className={styles.formContainer}>
    <div className={styles.inputContainer}>
      <input type='text' placeholder='Enter Name' ref={nameRef}/>
      </div>
      <div className={styles.inputContainer}>
      <input type='email' placeholder='Enter Email' ref={emailRef}/>
      </div>
      <div className={styles.inputContainer}>
      <input type='password' placeholder='Enter Password' ref={passwordRef}/>
      </div>       
       {error&&<p className={styles.error}>{error}</p>}

      <div className={styles.btnContainer}>
      <button onClick={handleSignUp}>Sign Up</button>
      </div>
      <NavLink to="/sign-in"><p>
        Or Sign In</p></NavLink>
       
    </div>
    </div>
  </div>
  )
}

export default Signup