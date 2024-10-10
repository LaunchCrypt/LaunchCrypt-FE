import React from 'react'
import NavbarLeft from './NavbarLeft'
import NavbarRight from './NavbarRight'

function Navbar() {
    return (
        <div className='flex flex-row justify-between px-3 self-start w-full flex-shrink-0'>
            <NavbarLeft />
            <NavbarRight />
        </div>
    )
}

export default Navbar