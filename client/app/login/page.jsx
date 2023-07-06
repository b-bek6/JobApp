import React from 'react'

export default function page() {
  return (
    <>
      <div className='bg-secondary p-6 text-2xl font-Poppins flex justify-center'>Login</div>
      <div className='h-[72vh] flex items-center justify-center'>
        {/* <div className=' grid justify-center align-middle border'> */}
        <div className=' grid gap-4 border pt-[15vh] pb-[15vh] p-[10vh]'>
            <div className='grid gap-2'>
              <div>Username</div>
              <div><input type="text" className='border outline-none p-1.5 rounded-md w-64'/></div>
            </div>
            <div className='grid gap-2'>
              <div>Password</div>
              <div><input type="text" className='border outline-none p-1.5 rounded-md w-64'/></div>
            </div>
            <button className='border rounded-md font-bolt bg-primary text-white p-1.5 w-full'>Login</button>
            <div>Not a member? <span className='font-bolt'>Register</span></div>
         </div>
        {/* </div> */}
      </div>
      
    </>
  )
}
