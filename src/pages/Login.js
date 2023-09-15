import React, { useEffect } from 'react'
import '../styles/login.css'
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import { useAxios } from '../hooks/useAxios';
import { toast } from 'react-hot-toast';
import { authApi } from '../api/Auth';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const {error,loading,sendRequest}=useAxios()
  const dispatch=useDispatch();

  useEffect(()=>{
    if(error?.errors){
      toast.error(error.errors)
    }else if(error?.message){
      toast.error(error.message)
    }
  },[error])

  const handleFormSubmit=(e)=>{
    e.preventDefault()

    if (!email || !password) {
      toast.error('All fields are required!');
      return;
    }

    sendRequest({
      method:'POST',
      url:authApi.signin,
      data:{
        email,
        password
      }
    },(data)=>{
      const {user,token}=data
      dispatch(setUser({user,token}))
    })

  }

  return (
    <form className='loginForm' onSubmit={handleFormSubmit}>
      <span className='loginSignupHeader'>Log In</span>
      
      <div className='field'>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className='field'>
        <input
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <div className='field'>
        <button disabled={loading}>
          {loading? 'Logging in...' : 'Login'}
        </button>
      </div>

      <div style={{marginTop:'5px'}}>
        Do not have an account?&nbsp;
        <Link to='/sign-up'>
          <span>Sign Up</span>
        </Link>
      </div>
    </form>
  )
}

export default Login