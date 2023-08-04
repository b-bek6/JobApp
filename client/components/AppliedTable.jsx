'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {AiOutlineDelete, AiFillEdit, AiOutlineEye} from 'react-icons/ai'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function AppliedTable({id}) {
    const [job, setJob] = useState([])
    const [remove, setRemove] = useState(false)
    const [deleteModel, setDeleteModel] = useState(false)
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
          toast.success('Application Has Been Deleted!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        })
        .catch(err => {
          toast.error('Somthing Went Wrong !', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        })
      }
  return (
    <>
   
    <tr className='bg-white border '>
    {
      !remove
      &&
      <>
              <td  className='px-6 py-4'> {job?.name}</td>
              <td  className='px-6 py-4'>{job?.category}</td>
              <td className='px-6 py-4'>{job?.created_at?.substring(0, 10)}</td>
              <td  className='px-6 py-4'>{job?.deadline?.substring(0, 10)}</td>
              <td className=' px-6 py-4 gap-6 flex'> 
              <Link href={`/jobs/${id}`}>
                <div className='text-green-800'><AiOutlineEye/></div>
              </Link>
                <div className='text-sky-400'><AiFillEdit/></div>
                <div onClick={() => {
                  setDeleteModel(!deleteModel)
                  // removeApply(id)
                }} className='text-red-500'><AiOutlineDelete /></div>
              </td>
      </>
    }
    </tr>
    {
      deleteModel
      &&
    <tr>
      <td colSpan={5} className='px-2 py-2 bg-red-200 rounded-b-xl pl-10 pr-10 '>
        <div className='flex justify-between'>
          <div>Are you sure?</div>
          <div className='flex gap-4'>
            <button onClick={()=>{
              setDeleteModel(false)
              removeApply(id)
            }} className=' bg-red-400 hover:bg-red-700 p-1 pl-3 pr-3  text-white rounded-md text-sm'>Delete</button>
            <button onClick={() => {
              setDeleteModel(false)
            }} className='border p-1 pl-3 pr-3  text-black rounded-md text-sm'>Cancel</button>
          </div>
        </div>
      </td>
      </tr>
    }
    </>
  )
}
