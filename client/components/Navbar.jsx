import React from 'react'

export default function Navbar() {
  return (
        <div className='container flex py-2 gap-2 flex-row justify-between items-center'>
        <div className='text-2xl text-primary '>
            JobsPortal
        </div>
        <div className='gap-2 flex'>
            <button className='text-primary'>Login</button>
            <button className='border rounded-lg font-bolt bg-primary text-white p-1.5'>Post a Job</button>
        </div>
        </div>
        
  )
}
