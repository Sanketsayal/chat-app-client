import React from 'react'
import {GrChatOption} from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { GoSignOut } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'

import { deleteUser } from '../redux/features/userSlice'
import '../styles/navbar.css'

function Navbar() {

  const {user}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  
  const handleLogout=()=>{
    dispatch(deleteUser())
  }


  return (
    <div className='nav-container'>
        <Link className='nav-icon' to='/'>
            <GrChatOption />
            ChatterBox
        </Link>
        <div className='nav-right'>
          {user?<h4>Welcome! <span>{user.username}</span></h4>:null}
          {user?
            <div className='signout' onClick={handleLogout}>
              <GoSignOut />
            </div>:null
          }
          

        </div>
        
    </div>
  )
}


export default Navbar