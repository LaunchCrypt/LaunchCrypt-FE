import React from 'react'
import UserProfile from './UserProfile'
import StatsButton from './StatsButton'
import TokenButton from './TokenButton'
import SwapButton from './SwapButton'
import Addliquidity from './Addliquidity'
import rocketIcon from "../../../assets/images/rocket-logo1.png"
function NavbarLeft() {
  return (
    <div className='flex flex-row justify-center align-center items-center space-x-6'>
      <img src={rocketIcon} alt="" className='h-9 w-9 cursor-pointer'/>
      <UserProfile />
      <SwapButton />
      <TokenButton />
      <StatsButton />
      <Addliquidity />
    </div>
  )
}

export default NavbarLeft