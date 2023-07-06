import React from 'react'
import Image from 'next/image'
import Banner from '@/public/assets/images/banner.png'

export default function Home() {
  return (
    <div className='bg-[#ddfadf86]'>
        <div className='flex container flex-col md:flex-row '>
            
            <div className='flex justify-center flex-col gap-8 md:w-1/2 md:m-40 order-2 md:order-1 max-w-lg m-2'>
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
            <div className='order-1 md:order-2 grid justify-center md:mt-20 h-[50vh]'>
                <Image src={Banner} />
            </div>
        </div>
    </div>
    
  )
}
