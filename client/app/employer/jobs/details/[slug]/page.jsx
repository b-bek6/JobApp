
'use client'
import Spinner from '@components/Spinner'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Link from 'next/link'
import JobDetails from '@components/JobDetails'
import { useParams } from 'next/navigation'

export default function SingleProduct() {
    const  {slug } = useParams();
    let redux_user = useSelector((store)=> store.user.value )
    const [job, setJob] = useState({})
    const [spinner, setSpinner] = useState(true)
    const [remove, setRemove] = useState(false)
    
    useEffect(()=>{
        axios.get(`https://job-app-ten-mu.vercel.app/api/jobs/${slug}`)
        .then(res => {
            setJob(res.data.job)
            setSpinner(false);
        })
        .catch (err => {
            console.log(err)
            setSpinner(false)
        })
        
    },[])
    function handleDelete () {
        axios.delete(`https://job-app-ten-mu.vercel.app/api/jobs/${slug}`,{
          headers : {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then (res => {
          console.log("removed")
          setRemove(true)
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
            remove
            ?
            <div className='bg-red-400 p-6 text-2xl font-Poppins flex justify-center'>Job Has Been Removed</div>
            :
            <div className='container'>
                <div className='m-3 flex justify-center gap-4'>
                    <button onClick={handleDelete} className='btn bg-secondary text-black'>Delete Job</button>
                    {
                        redux_user?.role == 'employer'
                        &&
                        <Link href={`/employer/jobs/edit/${slug}`}>
                            <button className='btn'>Edit Job</button>
                        </Link>
                    }
                </div>
                {
                    spinner
                    ?
                    <div className='flex justify-center m-3 align-middle'>
                        < Spinner />
                    </div>
                    :
                    // <div className='m-3'>
                    //     <div>
                    //         <span className='font-bold font-Poppins text-md'> Name </span> : <span className='font-Poppins text-1xl'>{job?.name}</span> 
                    //     </div>
                    //     <div>
                    //         <span className='font-bold font-Poppins text-md'> Job Level </span> : <span className='font-Poppins text-1xl'>{job?.joblevel}</span> 
                    //     </div>
                    //     <div>
                    //         <span className='font-bold font-Poppins text-md'> No of Vacancy </span> : <span className='font-Poppins text-1xl'>{job?.no_of_vacancy}</span> 
                    //     </div>
                    //     <div>
                    //         <span className='font-bold font-Poppins text-md'> Company Name </span> : <span className='font-Poppins text-1xl'>{job?.company_name}</span> 
                    //     </div>
                    //     <div>
                    //         <span className='font-bold font-Poppins text-md'> Location </span> : <span className='font-Poppins text-1xl'>{job?.location}</span> 
                    //     </div>
                    //     <div>
                    //         <span className='font-bold font-Poppins text-md'> Offered Salary </span> : <span className='font-Poppins text-1xl'>{job?.offered_salary}</span> 
                    //     </div>
                    //     <div>
                    //         <div className=' mt-3 mb-3 font-bold font-Poppins text-xl'>
                    //             Job Description
                    //         </div>
                    //         <p>{job?.description}</p>
                    //     </div>
                    // </div>
                    <JobDetails job={job}/>
                    

                }
            </div>
        }
    </div>
  )
}
