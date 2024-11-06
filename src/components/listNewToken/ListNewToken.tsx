import React, { useState } from 'react'
import listNewToken from '../../../assets/icons/listNewToken.png'
import Modal from '../Modal/Modal'
import './styles.css'

import NewTokenForm from './NewTokenForm'

function ListNewToken() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    return (
        <>
            <div onClick={() => setIsModalVisible(true)} className='fixed flex flex-row justify-center align-middle bottom-6 right-6 cursor-pointer group'>
                <p className='h-fit self-center bg-[#16162d] p-[2px_8px] text-sm text-[#fbfaff99] font-medium rounded-lg group-hover:bg-[#6e42ca] mr-2'>List token</p>
                <img src={listNewToken} className='animate-smooth-float w-12 h-12 transition-transform bg-[%6e42ca]' />
            </div>

            <Modal isVisible={isModalVisible} onClose={()=>setIsModalVisible(false)} children={<NewTokenForm setCloseModal={()=>setIsModalVisible(false)}/>}/>
        </>
    )
}

export default ListNewToken