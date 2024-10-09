import React from 'react'
import UserProfile from './UserProfile'
import StatsButton from './StatsButton'
function NavbarLeft() {
  return (
    <div className='flex flex-row justify-center align-center items-center space-x-6'>
        <UserProfile/>
        <StatsButton />
    </div>
  )
}

export default NavbarLeft