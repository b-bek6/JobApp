import Link from 'next/link'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function Job({job}) {
  const redux_user = useSelector(store=> store.user.value)
  return (
    <div className='container border m-3'>
        <div className='flex flex-col align-middle items-center justify-center md:flex-row gap-2 md:gap-10 m-3'>
            <div className='rounded-full hrounded-full w-20 h-20 bg-primary' >
                
            </div>
            <div className='flex flex-col justify-center items-center md:items-start '>
                <div className='font-Poppins text-1xl'>{`${job.company_name}`} </div>
                <div className='font-bold text-xl'>{`${job.name} (${job.joblevel})`}</div>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-1'>
                    <div className='col-span-2 md:col-span-1'>{`${job.location}`}</div>
                    <div>{`${job.category},`}</div>
                    <div>Rs {job.offered_salary}</div>
                </div>
            </div>
            <div className='flex items-center'>
              {
                redux_user?.role == 'employer'
                ?
                <Link href={`/employer/jobs/details/${job._id}`}>
                    <button className='btn  md:h-1/2'> View Details </button>
                </Link>
                :
                <Link href={`/jobs/${job._id}`}>
                    <button className='btn  md:h-1/2'> View Details </button>
                </Link>

              }
            </div>
      </div>
    </div>
  )
}
