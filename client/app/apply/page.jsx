'use client'
import ProtectedPage from '@components/ProtectedPage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AppliedTable from '@components/AppliedTable'

export function page() {
  const [applies, setApplies] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8001/api/apply',{
          headers: {
            Authorization : "Bearer " +localStorage.getItem("token")

          }
        })
        .then(res => {
          console.log(res.data)
          setApplies(res.data)
        })
    },[])
  return (
    <table class="border table-auto items-start container">
  <thead className='border'>
    <tr className='border'>
      <th className='border'>Title</th>
      <th className='border'>Job Type</th>
      <th className='border'>Posted Date</th>
      <th className='border'>Application Deadline</th>
      <th className='border'>Action</th>
    </tr>
  </thead>
  <tbody>
    {
      applies.map(applies => {
        return <>
            <AppliedTable id={applies.applied_jobs[0].job_id} />
            </>
      })
    }
  </tbody>
</table>
  )
}

export default ProtectedPage(page,'jobseeker')
