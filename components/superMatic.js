import React from 'react'
import SuperMaticImg from "../public/images/superMatic.png";
import Image from 'next/image';

const SuperMatic = () => {
  return (
    <div className='flex flex-row gap-2 justify-center items-center'>
        <span className='font-sansationR font-bold text-sm'>SUP</span>
        <div className='w-6'>
            <Image alt="super matic" src={SuperMaticImg}></Image>
        </div>
        
    </div>
  )
}

export default SuperMatic