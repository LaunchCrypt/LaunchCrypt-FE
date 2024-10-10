import React from 'react'
import BellButton from './BellButton'
import ConnectWallet from '../Wallet/ConnectWallet'
import NetworkButton from './NetworkButton'
import EllipsisButton from './EllipsisButton'

function NavbarRight() {
  return (
    <div className='flex flex-row align-middle justify-center items-center space-x-2'>
        <BellButton/>
        <ConnectWallet/>
        <NetworkButton/>
        <EllipsisButton/>
    </div>
  )
}

export default NavbarRight