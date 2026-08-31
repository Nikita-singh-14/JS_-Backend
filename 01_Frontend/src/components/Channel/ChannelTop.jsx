import React from 'react'
import Button from '../Button'


const ChannelTop = () => {
  return (
    <div>
      <img src="coverImage" alt="coverImage" />
      <div className='flex'>
        <div>
          <img src="avatar" alt="avatar" />
          <div>
            <h2>Full Name</h2>
            <p>User Name</p>
            <p>100k Subscribers . 220 Subscribed</p>
          </div>
        </div>
        <Button text='Subscribe'/>
      </div>
    </div>
  )
}

export default ChannelTop