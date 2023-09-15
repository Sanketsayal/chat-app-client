import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAxios } from '../hooks/useAxios';
import { authApi } from "../api/Auth";
import {HiOutlineRefresh} from 'react-icons/hi'
import styled from 'styled-components';
import { setUser } from '../redux/features/userSlice';

import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAvatar } from '../hooks/useAvatar';
import { useDispatch } from 'react-redux';

function SignUp() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarImage,setAvatarImage]=useState('');
  const dispatch=useDispatch()
  
  const {loading,error,sendRequest}=useAxios()
  const {error:avatarError,isLoading:avatarLoading,fetchAvatar}=useAvatar()


  useEffect(()=>{
    if(error?.errors){
      toast.error(error.errors)
    }else if(error?.message){
      toast.error(error.message)
    }
  },[error])

  const validate=()=>{
    if(password!==confirmPassword){
      toast.error('Password not same as confirm password')
      return false
    }
    return true
  }

  const handleFormSubmit=(e)=>{
    e.preventDefault()
    const isValid=validate()
    if(isValid){

      sendRequest({
        method:'POST',
        url:authApi.signup,
        data:{
          username,email,password,avatarImage
        }
      },(data)=>{
        const {user,token}=data
        dispatch(setUser({user,token}))
      })
    }
  }

  const generateAvatar=useCallback(async()=>{
    const avatar=await fetchAvatar()
    setAvatarImage(avatar)

  },[fetchAvatar])

  const handleGenerate=(e)=>{
    e.preventDefault()
    e.stopPropagation()
    generateAvatar()
  }


  useEffect(()=>{
    generateAvatar()
  },[generateAvatar])

  return (
    <form className='loginForm' onSubmit={handleFormSubmit}>
      <span className='loginSignupHeader'> Sign Up</span>
      <div className='field'>
        <input
          placeholder="Name"
          type="text"
          required
          value={username}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
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
        <input
          placeholder="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className='field' id='avatar-box'>
        <div className='avatar'>
          {avatarImage?
          <img 
            className={avatarLoading?'fade':''}
            src={`data:image/svg+xml;base64,${avatarImage}`}
            alt='user-avatar'
          />:null}
          
        </div>
        
        <button id='generate-button' onClick={handleGenerate}>
          <HiOutlineRefresh className={avatarLoading?'spin':''} />
          &nbsp;{avatarLoading?'Generating...':'Generate Avatar'} 
        </button>
      </div>

      <div className='field'>
        <button disabled={loading}>
          {loading? 'Signing up...' : 'Signup'}
        </button>
      </div>

      <div style={{marginTop:'5px'}}>
        already have an account?&nbsp;
        <Link to='/login'>
          <span>Login</span>
        </Link>
      </div>
    </form>
  )
}


export default SignUp