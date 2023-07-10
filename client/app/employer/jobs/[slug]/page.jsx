
'use client'
import Spinner from '@components/Spinner'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import AvoidEmployer from '@components/AvoidEmployer'

export default function SingleProduct(ctx) {
    let redux_user = useSelector((store)=> store.user.value )
    const [applied, setApplied] = useState(false)
    const [job, setJob] = useState({})
    const [spinner, setSpinner] = useState(true)
    
    useEffect(()=>{
        axios.get(`http://localhost:8001/api/jobs/${ctx.params?.slug}`)
        .then(res => {
            setJob(res.data.job)
            setSpinner(false);
        })
        .catch (err => {
            console.log(err)
            setSpinner(false)
        })
        
    },[])
    const arr = Object.entries(job);
    console.log(ctx.params?.slug)
    function applyJobs () {
        console.log(job._id)
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
            <div className='bg-secondary p-6 text-2xl font-Poppins flex justify-center'>{job.name} <small>{` (${job.joblevel}) `}</small> - {job.company_name}</div>

        }
        {
            applied
            &&
            <div className='bg-green-300 p-6 text-2xl font-Poppins flex justify-center'>Job Has Been Applied</div>
        }
        <div className='container'>
            <div className='m-3 flex justify-center gap-4'>
                <button className='btn bg-secondary text-black'>Delete Job</button>
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
                <div className='m-3'>
                    <div>
                        <span className='font-bold font-Poppins text-md'> Name </span> : <span className='font-Poppins text-1xl'>{job.name}</span> 
                    </div>
                    <div>
                        <span className='font-bold font-Poppins text-md'> Job Level </span> : <span className='font-Poppins text-1xl'>{job.joblevel}</span> 
                    </div>
                    <div>
                        <span className='font-bold font-Poppins text-md'> No of Vacancy </span> : <span className='font-Poppins text-1xl'>{job.no_of_vacancy}</span> 
                    </div>
                    <div>
                        <span className='font-bold font-Poppins text-md'> Company Name </span> : <span className='font-Poppins text-1xl'>{job.company_name}</span> 
                    </div>
                    <div>
                        <span className='font-bold font-Poppins text-md'> Location </span> : <span className='font-Poppins text-1xl'>{job.location}</span> 
                    </div>
                    <div>
                        <span className='font-bold font-Poppins text-md'> Offered Salary </span> : <span className='font-Poppins text-1xl'>{job.offered_salary}</span> 
                    </div>
                    <div>
                        <div className=' mt-3 mb-3 font-bold font-Poppins text-xl'>
                            Job Description
                        </div>
                        <p>{job.description}</p>
                    </div>
                </div>

            }
        </div>
    </div>
  )
}
