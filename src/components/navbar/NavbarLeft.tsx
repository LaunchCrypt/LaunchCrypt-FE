import React from 'react'
import UserProfile from './UserProfile'
import StatsButton from './StatsButton'
import TokenButton from './TokenButton'
import SwapButton from './SwapButton'
import Addliquidity from './Addliquidity'
function NavbarLeft() {
  return (
    <div className='flex flex-row justify-center align-center items-center space-x-6'>
        <UserProfile/>
        <SwapButton/>
        <TokenButton/>
        <StatsButton />
        <Addliquidity/>
    </div>
  )
}

export default NavbarLeft