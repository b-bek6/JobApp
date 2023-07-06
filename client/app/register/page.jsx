import React from 'react'

export default function page() {
  return (
    <>
      <div className='bg-secondary p-6 text-2xl font-Poppins flex justify-center'>Register</div>
      <div className='h-[72vh] flex items-center justify-center'>
        {/* <div className=' grid justify-center align-middle border'> */}
        <div className=' grid gap-4 border pt-[8vh] pb-[8vh] p-[10vh]'>
            <div className='grid gap-2'>
              <div>Name</div>
              <div><input type="text" className='border outline-none p-1.5 rounded-md w-64'/></div>
            </div>
            <div className='grid gap-2'>
              <div>Username</div>
              <div><input type="text" className='border outline-none p-1.5 rounded-md w-64'/></div>
            </div>
            <div className='grid gap-2'>
              <div>Password</div>
              <div><input type="text" className='border outline-none p-1.5 rounded-md w-64'/></div>
            </div>
            <label htmlFor="role" class="form-label">Role</label>
                <select className='border outline-none p-1.5 rounded-md w-64' name="role">
                    <option value="">Select</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select> 
            <button className='border rounded-md font-bolt bg-primary text-white p-1.5 w-full'>Create Account</button>
            <div>Already a member? <span className='font-bolt'>Login</span></div>
         </div>
        {/* </div> */}
      </div>
      
    </>
  )
}
