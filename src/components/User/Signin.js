import React, { useRef, useState } from 'react'
import styles from './signin.module.css'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { NavLink, useNavigate, useNavigation } from 'react-router-dom'
import { useValueAuth } from '../../context/authContext'

function Signin() {
  const {handleAuthentication} = useValueAuth()
  const [error,setError]=useState(null)
  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()
  const auth = getAuth()
  const handleSign =async ()=>{
    try{
      const response=await signInWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value)
      const data = await response._tokenResponse
      handleAuthentication({
        userId: data.localId,
        email: data.email, 
        token: data.idToken
      })
      navigate("/")
    }catch(error){
      setError(error.message)
    }
  }
  return (
    <div className={styles.signinContainer}> 
      <div className={styles.signinContent}>
      <h1>
        Sign In
      </h1>
      <div className={styles.formContainer}>
        <div className={styles.inputContainer}>
        <input type='email' placeholder='Enter Email' ref={emailRef}/>
        </div>
        <div className={styles.inputContainer}>
        <input type='password' placeholder='Enter Password' ref={passwordRef}/>
        </div>       
         {error&&<p className={styles.error}>{error}</p>}

        <div className={styles.btnContainer}>
        <button onClick={()=>handleSign()}>Sign In</button>
        </div>
        <NavLink to="/sign-up"><p>
        Or Sign Up instead</p></NavLink>
       
  
      </div>
      </div>
    </div>
  )
}

export default Signin