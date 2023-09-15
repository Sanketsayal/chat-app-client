import React from 'react'
import '../styles/home.css'
import { ChatList, ChatRoom } from '../components'

function Home() {
  return (
    <div className='container'>
      <div className='inner'>
        <ChatList />
        <ChatRoom />
      </div>
    </div>
  )
}

export default Home