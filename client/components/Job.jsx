import Link from 'next/link'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
export default function Job({job}) {
  const redux_user = useSelector(store=> store.user.value)
  return (
    <div className='container border m-3 shadow-xl'>
        <div className='flex flex-col align-middle justify-center items-center md:flex-row gap-2 md:gap-10 m-3'>
          {
            job.images 
            ?
            <>
            <img
              height={1000}
              width={1000}
              className="w-[100px] rounded-2xl"
              src={`http://localhost:8001/${job.images}`}
              alt="Job Image" />
            </>
            :
            <div className='rounded-full hrounded-full w-20 h-20 bg-primary' >
            </div>
          }
            <div className='flex flex-col justify-center md:w-1/2 align-middle md:items-start items-center'>
                <div className='font-Poppins text-1xl'>{`${job.company_name}`} </div>
                <div className='font-bold text-xl'>{`${job.name} (${job.joblevel})`}</div>
                <div className='flex flex-col md:flex-row md:gap-2 items-center'>
                    <div className=''>{`${job.location}`}</div>
                    <div className='flex gap-2'>
                    <div>{`${job.category},`}</div>
                    <div>Rs {job.offered_salary}</div>
                    </div>
                </div>
            </div>
            <div className='flex items-center'>
              {
                redux_user?.role == 'employer'
                ?
                <Link href={`/employer/jobs/details/${job._id}`}>
                    <button className='btn shadow-xl md:h-1/2'> View Details </button>
                </Link>
                :
                <Link href={`/jobs/${job._id}`}>
                    <button className='btn shadow-xl md:h-1/2'> View Details </button>
                </Link>

              }
            </div>
      </div>
    </div>
  )
}
