'use client'
import axios from 'axios'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function page() {
  
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [error, setErrors] = useState({

  })

  function handleSubmit(event) {
    event.preventDefault()

    // validation
    let temp = {}
    let validation = true
    if(!name) {
      temp.name = "required"
      validation = false
    }
    if(!email){
      temp.email="required"
      validation = false
    }
    setErrors(temp)
    if(validation){
      axios.post(`https://job-1c3nlgegi-b-bek6.vercel.app/api/signup`,{
      "name": name,
      "role": event.target.role.value,
      "password": event.target.password.value,
      "email": email
    })
    .then(res => {
      router.push("/login");
    })
    .catch((err) => {

      let temp = {}
          if (err.response.data.errors && err.response.data.errors?.length > 0) {
            err.response.data.errors.forEach(individual_error => {
              temp[individual_error.params] = individual_error.msg
            })
            setErrors(temp)
          }
    })
    }
  }
  return (
    <>
      <div className='bg-secondary p-6 text-2xl font-Poppins flex justify-center'>Register</div>
        <form onSubmit={handleSubmit} className='xl:h-[72vh] flex items-center justify-center'>
          {/* <div className=' grid justify-center align-middle border'> */}
          <div className=' grid gap-4 border md:pt-[8vh] md:pb-[8vh] p-[10vh] '>
              <div className='grid gap-2'>
                <div>Name</div>
                <div className='flex flex-col'>
                  <input type="text" name='name' value={name} onChange={(e)=>{
                    setName(e.target.value)
                    
                    if (e.target.value) {
                      setErrors({ ...error, name: "" })
                    } else {
                      setErrors({ ...error, name: "required" })
                    }
                    
                  }} className='input'/>
                  {
                    error.name 
                    &&
                    <small className='text-red-500'>{error.name}</small>
                  }
                  </div>
              </div>
              <div  className='grid gap-2'>
                <div>Email</div>
                <div className='flex flex-col'>
                  <input type='email' name='email' value={email} onChange={(e)=>{
                  setEmail(e.target.value)

                  if (e.target.value) {
                    setErrors({ ...error, email: "" })
                  } else {
                    setErrors({ ...error, email: "required" })
                  }

                }} className='input'/>
                {
                    error.email 
                    &&
                    <small className='text-red-500'>{error.email}</small>
                  }
                </div>
              </div>
              <div className='grid gap-2'>
                <div>Password</div>
                <div><input type="password" name='password' className='input'/></div>
              </div>
              <label htmlFor="role" class="form-label">Role</label>
                  <select className='input' name="role">
                      <option value="">Select</option>
                      <option value="employer">Employer</option>
                      <option value="jobseeker">Jobseeker</option>
                  </select> 
              <button className='border rounded-md font-bolt bg-primary text-white p-1.5 w-full'>Create Account</button>
              <div>Already a member? <span className='font-bolt'> <Link href={"/login"}>Login</Link> </span></div>
          </div>
      </form>
      
    </>
  )
}
