'use client'
import React, { useState, useEffect } from 'react'
import Job from '@components/Job'
import ProtectedPage from '@components/ProtectedPage'
import Link from 'next/link'
import axios from 'axios'

export function page() {
  const [jobs, setJobs] = useState([])
  useEffect(()=>{
    axios.get('https://job-1c3nlgegi-b-bek6.vercel.app/api/jobs/employer',{
      headers : {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then(response => {
      console.log(response.data);
      setJobs(response.data);
  });
  },[]);
  
  return (
    <div>
        <div className='bg-secondary p-6 text-2xl font-Poppins flex justify-center'>All Jobs You've Posted</div>
        <div className=' container grid'>
        
      {
        jobs?.map(job => (
          <Job job={job}/>
        ))
      }
      </div>
      <div className='flex justify-center'>
        <button className='btn mb-3'> <Link href={'/jobs'}>View More</Link> </button>
      </div>
      
    </div>
  )
}

export default ProtectedPage(page,'employer');
