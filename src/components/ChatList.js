import React, { useState } from 'react'
import '../styles/chatlist.css'
import { useSelector } from 'react-redux'
import { BsChevronDown,BsChevronUp } from 'react-icons/bs'

function ChatList() {
  let {user}=useSelector((state)=>state.user)
  let [display,setDisplay]=useState({
    chats:true,
    users:true
  })

  const toggleList=(key)=>{
    setDisplay((prev)=>({...prev,[key]:!display[key]}))
  }

  console.log(display['users'])
  return (
    <div className='chat-list'>
        <div className='list-header'>
          <img
            src={`data:image/svg+xml;base64,${user.avatar}`}
            alt='user-avatar'
          />
        </div>

        <div className='user-list'>
        <div className='group-title' onClick={()=>toggleList('users')}>
          Users {display['users']?<BsChevronUp />:<BsChevronDown />}
        </div>
          

        </div>
    </div>
  )
}

export default ChatList