'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {AiOutlineDelete, AiFillEdit, AiOutlineEye} from 'react-icons/ai'
import Link from 'next/link'

export default function AppliedTable({id}) {
    const [job, setJob] = useState({})
    const [remove, setRemove] = useState(false)
    useEffect(()=>{
        axios.get(`https://job-app-ashy-theta.vercel.app/api/jobs/${id}`)
        .then(res => {
            setJob(res.data.job)
            console.log(res.data)
        })
        .catch (err => {
            console.log(err)
        })
  
      },[])
      function removeApply (id) {
        // console.log(id)
        axios.delete(`https://job-app-ashy-theta.vercel.app/api/apply/${id}`,{
          headers : {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then (res => {
          console.log("removed")
          setRemove(true)
        })
      }
  return (
    <>
    {
      remove
      ?
      <td className=' border container text-red-400 font-Poppins text-md flex align-middle justify-center'>Job Has Been Removed</td>
      :
        <tr>
              <td  className='border'> {job?.name}</td>
              <td  className='border'>{job?.category}</td>
              <td className='border'>{job?.created_at?.substring(0, 10)}</td>
              <td  className='border'>{job?.deadline?.substring(0, 10)}</td>
              <td className=' border-t flex gap-6 align-middle justify-center'> 
              <Link href={`/jobs/${id}`}>
                <div className='text-green-800'><AiOutlineEye/></div>
              </Link>
                <div className='text-sky-400'><AiFillEdit/></div>
                <div onClick={() => {
                  removeApply(id)
                }} className='text-red-500'><AiOutlineDelete /></div>
              </td>
            </tr>
    }
    </>
  )
}
