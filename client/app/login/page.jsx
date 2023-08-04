'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Spinner from '@components/Spinner'
import { setReduxUser } from '../redux/slice/userSlice'
import { useDispatch } from 'react-redux'

export default function page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState({})
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(event){
    let temp = {}
    event.preventDefault();
    let validation = true

    if(!email){
      validation = false
      temp.email = "required"
    }
    if(!password){
      validation = false
      temp.password = "required"
    }
    setError(temp)
    if(validation){
      setIsSubmitting(true)
      axios.post("https://job-app-ashy-theta.vercel.app/api/login",{
        "email":email,
        "password":password
      })
      .then(res =>{
        // console.log(res.data)
        dispatch(setReduxUser(res.data.data))
        setIsSubmitting(false)
        localStorage.setItem("token",res.data.token)
        router.push('/');
      })
      .catch(err=>{
        console.log(err.response.data)
        // setError({...error, error:err.response.data.err[0].message})
        setError({...error, error:"Invalid Credentials"})
        setIsSubmitting(false)
      })
    }
  }
  return (
    <>
      <div className='bg-secondary p-6 text-2xl font-Poppins flex justify-center'>Login</div>
      <form onSubmit={handleSubmit} className='h-[72vh] flex items-center justify-center'>
        {/* <div className=' grid justify-center align-middle border'> */}
        <div className=' grid gap-4 border pt-[15vh] pb-[15vh] p-[10vh]'>
            <div className='grid gap-2'>
              <div>Username</div>
              <div className='flex flex-col'>
                <input type="email" name='email' value={email} onChange={(e)=>{
                setEmail(e.target.value)

                if (e.target.value) {
                  setError({ ...error, email: "" })
                } else {
                  setError({ ...error, email: "required" })
                }

              }} className='border outline-none p-1.5 rounded-md w-64' placeholder='example@example.com'/>
              {
                    error.email 
                    &&
                    <small className='text-red-500'>{error.email}</small>
                  }
              </div>
            </div>
            <div className='grid gap-2'>
              <div>Password</div>
              <div className='flex flex-col'>
                <input type="password" name='password' onChange={(e)=>{
                  setPassword(e.target.value);

                  if (e.target.value) {
                    setError({ ...error, password: "" })
                  } else {
                    setError({ ...error, password: "required" })
                  }
                }} className='border outline-none p-1.5 rounded-md w-64'/>
              {
                    error.password 
                    &&
                    <small className='text-red-500'>{error.password}</small>
                  }
              </div>
            </div>
            <button type='submit' disabled={isSubmitting} className='flex justify-center gap-4 border rounded-md font-bolt bg-primary text-white p-1.5 w-ful disabled:bg-[#84E1BC]'>
              Login
              {
              isSubmitting 
              && 
              <Spinner />
              }
              </button>
            <div>Not a member? <span className='font-bolt'><Link href={'/register'}>Register</Link> </span></div>
            {
          error.error
          &&
          <p className='bg-red-200  p-3'  >{error.error}</p>
        }
         </div>
        {/* </div> */}
      </form>
      
    </>
  )
}
