import React from 'react'
import UserProfile from './UserProfile'
import StatsButton from './StatsButton'
import SwapButton from './SwapButton'
import Addliquidity from './Addliquidity'
import rocketIcon from "../../../assets/images/rocket-logo1.png"
import EarnButton from './EarnButton'
function NavbarLeft() {
  return (
    <div className='flex flex-row justify-center align-center items-center space-x-6'>
      <img src={rocketIcon} alt="" className='h-9 w-9 cursor-pointer'/>
      <UserProfile />
      <SwapButton />
      <EarnButton />
      <StatsButton />
      <Addliquidity />
    </div>
  )
}

export default NavbarLeft