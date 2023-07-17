'use client'
import { useEffect, useState } from 'react';
import Job from './Job'
import axios from 'axios';
import Link from 'next/link';


export default function page() {
  const [jobs, setJobs] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8001/api/jobs/employer',{
      headers : {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then(response => {
      setJobs(response.data);
  });
  },[]);
  
  return (
    <div>
        <div className='bg-secondary p-6 text-2xl font-Poppins flex justify-center'>Your Jobs</div>
        <div className=' container grid'>
        
      {
        jobs?.map(job => (
          <Job job={job}/>
        ))
      }
      </div>
      <div className='flex justify-center'>
        <button className='btn mb-3'> <Link href={'/employer/jobs'}>View More</Link> </button>
      </div>
      
    </div>
  )
}