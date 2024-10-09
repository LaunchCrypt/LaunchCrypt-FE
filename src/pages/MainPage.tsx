import React from 'react'
import ConnectWallet from "../components/Wallet/ConnectWallet"
import NetworkButton from "../components/navbar/NetworkButton"
import EllipsisButton from '../components/navbar/EllipsisButton'
import BellButton from '../components/navbar/BellButton'
import UserIcon from "../components/UserIcon"
import NavbarLeft from '../components/navbar/NavbarLeft'
function MainPage() {
  return (
    <div className='flex flex-row w-full'>
        <NavbarLeft/>
        <BellButton />
        <ConnectWallet />
        <NetworkButton />
        <EllipsisButton />
        <UserIcon />
    </div>
  )
}

export default MainPage