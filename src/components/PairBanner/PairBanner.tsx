import React from 'react'
import { Fade, Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import aptosIcon from "../../../assets/icons/Aptos-logo.svg"
import solanaIcon from "../../../assets/icons/Solana-logo.svg"
import leftArrow from "../../../assets/icons/left-arrow.svg"
import rightArrow from "../../../assets/icons/right-arrow.svg"

import "./styles.css"


const images = [
  aptosIcon,
  solanaIcon,
];

function PairBanner() {
  return (
    <div className='h-[84px] w-[406px]'>
      <Fade duration={3000}>
        <div className="each-slide">
          <div className='flex flex-row align-middle items-center justify-center'>
            <div className='flex flex-row align-middle items-center justify-center mr-4 -translate-x-6'>
              <img src={images[0]} className='h-[60px] z-10 translate-x-6' />
              <img src={images[1]} className='h-[60px] z-0' />
            </div>
            <div className='-translate-x-6'>
              <p className='text-[26.57px] font-bold leading-[29.36px] text-left tracking-normal m-0 text-[#c57700]'>APT</p>
              <p className='text-[26.57px] font-bold leading-[29.36px] text-left tracking-normal m-0 text-white'>SOL</p>
            </div>
          </div>
          <div className='flex flex-row justify-center items-center align-middle'>
            <p className='text-md leading-[17.63px] mr-2'>TVL</p>
            <div>
              <p className='text-gradient text-md font-black tracking-[-.0043em] text-textPrimary'>200 SOL</p>
              <p className='text-gradient text-md font-black tracking-[-.0043em] text-textPrimary'>100 APT</p>
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div className='flex flex-row align-middle items-center justify-center'>
            <img src={images[0]} className='h-[60px] z-10 translate-x-6' />
            <img src={images[1]} className='h-[60px] z-0' />
          </div>
        </div>
        <div className="each-slide">
          <div className='flex flex-row align-middle items-center justify-center'>
            <img src={images[0]} className='h-[60px] z-10 translate-x-6' />
            <img src={images[1]} className='h-[60px] z-0' />
          </div>
        </div>
      </Fade>
    </div>
  )
}

export default PairBanner