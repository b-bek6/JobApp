'use client'
import { useState } from 'react';
import Job from './Job'
import axios from 'axios';

export default function Jobs({products}) {
  const [jobs, setJobs] = useState([])
    axios.get('http://localhost:8001/api/jobs').then(response => {
      console.log(response.data.data[0].jobs);
      setJobs(response.data.data[0].jobs);
  });
  
  return (
    <div>
        <div className='bg-secondary p-6 text-2xl font-Poppins flex justify-center'>All Popular Listed Jobs</div>
        <div className=' container gird justify-center align-middle '>
        </div>
      {
        jobs.map(job => (
          <div>{job.name}</div>
        ))
      }
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
