import React, { useState } from 'react'
import Image from 'next/image'
import Banner from '@/public/assets/images/banner.png'


export default function Job({job}) {
    const [jobs, setJobs] = useState([])
    axios.get('http://localhost:8001/api/jobs').then(response => {
      console.log(response.data.data[0].jobs);
      setJobs(response.data.data[0].jobs);
  });
  return (
    <div className='container flex flex-col md:flex-row justify-center md:justify-between align-middle m-3'>
        <div className='flex gap-10 justify-center'>
            <div className='rounded-full hrounded-full w-20 h-20 bg-primary' >
                .
            </div>
            <div>
                <div className='font-Poppins text-1xl'>Match Company Limited</div>
                <div>Fresher UI/UX Designer 3 Year Exp.</div>
                <div className='flex'>
                    <div>Nairobi, Kenya</div>
                    <div>Full Time</div>
                    <div>Ksh 150,000</div>
                </div>
            </div>
        </div>
        <div className='btn h-1/2 flex justify-center align-middle'> View Details</div>
    </div>
  )
}
