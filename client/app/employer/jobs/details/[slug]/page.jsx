
'use client'
import Spinner from '@components/Spinner'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Link from 'next/link'
import JobDetails from '@components/JobDetails'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


export default function SingleProduct() {
    const router = useRouter();
    const  {slug } = useParams();
    let redux_user = useSelector((store)=> store.user.value )
    const [job, setJob] = useState({})
    const [spinner, setSpinner] = useState(true)
    const [remove, setRemove] = useState(false)
    
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
    function handleDelete () {
        axios.delete(`http://localhost:8001/api/jobs/${slug}`,{
          headers : {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then (res => {
            toast.success('Job Has Been Deleted!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        })
        router.push("/employer/jobs")
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
        
            <div className='container'>
                <div className='m-3 flex justify-center gap-4'>



                    <button onClick={handleDelete} className='btn bg-secondary text-black'>Delete Job</button>
                    {
                        redux_user?.role == 'employer'
                        &&
                        <>
                        <Link href={`/employer/jobs/applicants/${slug}`}>
                            <button className='btn'>View Applicants</button>
                        </Link>
                        <Link href={`/employer/jobs/edit/${slug}`}>
                            <button className='btn'>Edit Job</button>
                        </Link>
                        </>
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
