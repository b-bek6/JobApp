
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
    </div>
  )
}

export default ProtectedPage(SingleProduct,'jobseeker')