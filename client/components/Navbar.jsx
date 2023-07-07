'use client'
import { logout } from '@app/redux/slice/userSlice'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function Navbar() {
  let redux_user = useSelector((store) => { return store.user?.value })
  console.log(redux_user)
  let dispatch = useDispatch();
  let logged_in = true
  return (
        <div className='container flex p-6 gap-2 flex-row justify-between items-center'>
          <div className='text-2xl text-primary '>
              JobsPortal
          </div>
          <div className='gap-2 flex items-center'>
              {
                redux_user
                ?
                <>
                <div className='text-primary'>{redux_user?.name}</div>
                <button className='text-primary' onClick={()=>{
                  dispatch(logout());
                }}>Logout</button>
                </>
                :  
                <button className='text-primary'><Link href="/login">Login</Link> </button>
              }
              {
                redux_user?.role == 'employer'
                &&
                <button className='border rounded-lg font-bolt bg-primary text-white p-1.5'>Post a Job</button>
              }
          </div>
        </div> 
  )
}
