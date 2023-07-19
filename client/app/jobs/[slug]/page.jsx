
'use client'
import ProtectedPage from '@components/ProtectedPage'
import Spinner from '@components/Spinner'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import JobDetails from '@components/JobDetails'
import { redirect, useParams } from 'next/navigation'
import Link from 'next/link'


export function SingleProduct(ctx) {
    const { slug }  = useParams();
    console.log(slug)
    let redux_user = useSelector((store)=> store.user.value )
    const [applied, setApplied] = useState(false)
    const [job, setJob] = useState({})
    const [spinner, setSpinner] = useState(true)
    
    useEffect(()=>{
        axios.get(`http://localhost:8001/api/jobs/${slug}`)
        .then(res => {
            setJob(res.data.job)
            setSpinner(false);
        })
        .catch (err => {
            console.log(err)
            setSpinner(false)
        })
    },[])
    console.log(ctx.params?.slug)
    function applyJobs () {
        console.log(job?._id)
        axios.post('http://localhost:8001/api/apply',{

                "applied_jobs":[
                  {
                    "job_id": job._id
                  }
              ]
        },{
            headers: {
                Authorization: "Bearer " +localStorage.getItem('token')
            }
        })
        .then(res => {
            setApplied(true)
        })
    }
  return (
    <div>
        {
            spinner
            ?
            <div className='bg-secondary p-6 text-2xl font-Poppins flex justify-center'><Spinner /></div>
            :
            <div className='bg-secondary p-6 text-2xl font-Poppins flex justify-center'>{job?.name} <small>{` (${job?.joblevel}) `}</small> - {job?.company_name}</div>

        }
        {
            applied
            &&
            <div className='bg-green-300 p-6 text-2xl font-Poppins flex justify-center'>Job Has Been Applied</div>
        }
        <div className='container'>
            <div className='m-3 flex justify-center gap-4'>
                <a href={`${job?.company_website}`} target="_blank" rel="noopener noreferrer">
                    <button className='btn bg-secondary text-black'>View Company</button>
                </a>
                {/* <Link href={`${job?.company_website}`} passHref>
                    <button className='btn bg-secondary text-black'>View Company</button>
                </Link> */}
                {
                    redux_user?.role == 'employer'
                    ?
                    <button className='btn'>Edit Job</button>
                    :
                    <button onClick={applyJobs} className='btn'>Apply This Job</button>


                }
            </div>
            {
                spinner
                ?
                <div className='flex justify-center m-3 align-middle'>
                    < Spinner />
                </div>
                :
                <JobDetails job={job}/>

            }
        </div>
        <div id="toast-success" class=" bg-green-300 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 rounded-lg shadow ">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
        <svg class="w-5 h-5"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="sr-only">Check icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">Item moved successfully.</div>
    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3"   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
        </div>
    </div>
  )
}

export default ProtectedPage(SingleProduct,'jobseeker')