import { ChangeEvent, useState, MouseEvent, FocusEvent } from 'react'

import styles from './Auth.module.scss'
import { signIn, signUp } from '../../api/auth'

export const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const[emailError, setEmailError] = useState('')
  
  
  const isValidEmail = (email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return(emailRegex.test(email))
  }

  const handleSign = () => {
    if(!isValidEmail(email))
    {
      alert('Please enter a valid email')
      setEmailError('incorrectEmail');
      return;
    } else {
      setEmailError('');
    }

  }
  
  return (

<form className={styles.form}>
      <div className={styles.blockInput}>
        <input className={styles.input} 
        name= "email"
        // required
        placeholder={emailError ? emailError : 'Email'}
        onChange={(e)=>{
          setEmail(e.target.value);
          setEmailError('');
        }}
        autoComplete='off'>
        </input>

        <input className={styles.input} 
        name= "password" 
        // required 
        placeholder='Password'
        onChange={(e)=>{setPassword(e.target.value)}}
        autoComplete='off'>
        </input>
      </div>

      <div className={styles.blockButton}>
        <button className={styles.button} onClick={handleSign}>Sign In</button>
        <button className={styles.button} onClick={()=>{}}>Register</button>
      </div>

</form>
    
  );
}
