'use client'
import AppliedTable from '@components/AppliedTable'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'




export default function page({id}) {
    const {slug} = useParams(); 
    const [application, setApplications] = useState([])

    useEffect(()=>{
        axios.get(`https://job-app-ashy-theta.vercel.app/api/jobs/employer/${slug}`,{
          headers: {
            Authorization : "Bearer " +localStorage.getItem("token")

          }
        })
        .then(res => {
          console.log(res.data)
          setApplications(res.data)
        })
    },[])
  return (
    <>

    <table class="border table-auto items-start container">
    <thead className='border'>
    <tr className='border'>
      <th className='border'>Name</th>
      <th className='border'>Email</th>
    </tr>
    </thead>
    <tbody>
   
    {
      application.map(applies => {
        return <>
            <tr className=''>
              <td  className='border'> {applies?.name}</td>
              <td  className='border'>{applies?.email}</td>
            </tr>
            </>
      })
    }
    </tbody>
    </table>
    </>
    

  )
}
