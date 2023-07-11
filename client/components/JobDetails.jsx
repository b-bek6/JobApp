import React from 'react'

export default function JobDetails({job}) {
  return (
    <div className='m-3'>
                    <div>
                        <span className='font-bold font-Poppins text-md'> Name </span> : <span className='font-Poppins text-1xl'>{job?.name}</span> 
                    </div>
                    <div>
                        <span className='font-bold font-Poppins text-md'> Job Level </span> : <span className='font-Poppins text-1xl'>{job?.joblevel}</span> 
                    </div>
                    <div>
                        <span className='font-bold font-Poppins text-md'> No of Vacancy </span> : <span className='font-Poppins text-1xl'>{job?.no_of_vacancy}</span> 
                    </div>
                    <div>
                        <span className='font-bold font-Poppins text-md'> Company Name </span> : <span className='font-Poppins text-1xl'>{job?.company_name}</span> 
                    </div>
                    <div>
                        <span className='font-bold font-Poppins text-md'> Location </span> : <span className='font-Poppins text-1xl'>{job?.location}</span> 
                    </div>
                    <div>
                        <span className='font-bold font-Poppins text-md'> Offered Salary </span> : <span className='font-Poppins text-1xl'>{job?.offered_salary}</span> 
                    </div>
                    <div>
                        <div className=' mt-3 mb-3 font-bold font-Poppins text-xl'>
                            Job Description
                        </div>
                        <p>{job?.description}</p>
                    </div>
                </div>
  )
}
