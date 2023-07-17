'use client'
import { useEffect, useState } from 'react';
import Job from './Job'
import axios from 'axios';
import Link from 'next/link';


export default function page() {
  const [jobs, setJobs] = useState([])
  useEffect(()=>{
    axios.get('https://job-app-ashy-theta.vercel.app/api/jobs?per_page=3').then(response => {
      console.log(response.data.data[0].jobs);
      setJobs(response.data.data[0].jobs);
  });
  },[]);
  
  return (
    <div className=''>
        <div className=' p-6 text-2xl font-Poppins flex justify-center'>All Popular Listed Jobs</div>
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

// export async function getServerSideProps() {
//   let res = await axios.get("https://ecommerce-sagartmg2.vercel.app/api/products?per_page=6")

//   return {
//     props: {
//       products: res.data.data[0].data
//     },
//   }
// }
