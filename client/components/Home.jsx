import React from 'react'
import Image from 'next/image'
import Banner from '@/public/assets/images/banner.png'

export default function Home() {
  return (
    <div className='bg-[#caeccc86] p-1'>
        <div className='flex container m-2 flex-col md:flex-row md:justify-around justify-between align-middle gap-2'>
            
            <div className='flex justify-center flex-col gap-8 md:w-1/2 order-2 md:order-1'>
                <div className='text-4xl md:text-6xl font-extrabold' >
                    Find A <span className='text-primary'>Job</span>  That <span className='text-primary'>Matches</span>  Your Passion 
                </div>
                <div className='font-Poppins'>
                    Hand-picked opportunities to work from home, remotely, freelance, full-time, part-time, contract and internships.
                </div>
                <div>
                    <span><input type="text" className='border outline-none p-1.5' /></span>
                    <button className='border rounded-md font-bolt bg-primary text-white p-1.5'>Search</button>
                </div>
            </div>
            <div className='order-1 md:order-2 flex justify-center'>
                <Image src={Banner} />
            </div>
        </div>
    </div>
    
  )
}
