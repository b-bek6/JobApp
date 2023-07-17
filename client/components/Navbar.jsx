'use client'
import { logout } from '@app/redux/slice/userSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'router'
import { AiOutlineUser } from 'react-icons/ai'

export default function Navbar() {
  const [show, setShow ] = useState(false)
  const router = useRouter;
  let redux_user = useSelector((store) => { return store.user?.value })
  console.log(redux_user)
  let dispatch = useDispatch();
  let logged_in = true
  return (
    <>
    <div className='container flex p-6 gap-2 flex-row justify-between items-center'>
          <div className='text-2xl text-primary '>
              <Link href={'/'}>JobsPortal</Link> 
          </div>
          <div id='nav' className='gap-2 hidden md:flex items-center'>
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
                <button className='border rounded-lg font-bolt bg-primary text-white p-1.5'>
                  <Link href={`/employer/jobs/create`}>
                     Post a Job
                  </Link>
                </button>
              }
              {
                redux_user?.role == 'jobseeker'
                &&
                <button className='border rounded-lg font-bolt bg-primary text-white p-1.5'>
                  <Link href={'/apply'}>
                     Applied Jobs
                  </Link>
                </button>
              }
          </div>
          <div onClick={()=>{
            setShow(!show);
          }} className='text-3xl md:hidden transition '>
          <AiOutlineUser/>
          </div>
        </div> 
            {
              show
              &&
              <div className='container'>
              <div id='nav' className='flex gap-4 items-center justify-center mb-3'>
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
                <button className='border rounded-lg font-bolt bg-primary text-white p-1.5'>
                  <Link href={`/employer/jobs/create`}>
                    Post a Job
                  </Link>
                </button>
              }
              {
                redux_user?.role == 'jobseeker'
                &&
                <button className='border rounded-lg font-bolt bg-primary text-white p-1.5'>
                  <Link href={'/apply'}>
                    Applied Jobs
                  </Link>
                </button>
              }
              </div>

              </div>
            }
    </>
        
  )
}
