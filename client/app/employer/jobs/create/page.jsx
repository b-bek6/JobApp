"use client"
import ProtectedPage from '@components/ProtectedPage';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify';


/* 
{"job":{"_id":"64a429c72a9c4b40e561c421",
"name":"Software dev",
"joblevel":"senior",
"category":"backend",
"no_of_vacancy":2,
"company_name":"Technonogy",
"location":"New York 4300, USA",
"offered_salary":500000,
"deadline":"2023-05-01T00:00:00.000Z",
"type":"featured",
"description":"We are seeking for a software engineer for our company. Applicant must have 5 years of experience in required field.",
"images":["image-1688480199499.png"],
"created_by":"6455e9a76fac939adcccb178",
"created_at":"2023-07-04T14:16:39.504Z",
"__v":0}}

*/

export function page({job}) {
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState({
        name:"",
        joblevel:"",
        company_website:"",
        category:"",
        no_of_vacancy:"",
        company_name:"",
        location:"",
        offered_salary:"",
        deadline:"",
        type:"",
        image:[],
        description:""

    })
    console.log(job)
    function handleSubmit(e){
        e.preventDefault();
        let form_data = new FormData();
        form_data.append("name",data.name)
        form_data.append("joblevel", data.joblevel)
        form_data.append("category", data.category)
        form_data.append("company_website",data.company_website)
        form_data.append("no_of_vacancy", data.no_of_vacancy)
        form_data.append("company_name", data.company_name)
        form_data.append("location", data.location)
        form_data.append("offered_salary", data.offered_salary)
        form_data.append("deadline" , data.deadline)
        form_data.append("type", data.type)
        form_data.append("image",data.image)
        form_data.append("description", data.description)

        axios.post("http://localhost:8001/api/jobs", form_data ,{
            headers:{
                Authorization: "Bearer "+ localStorage.getItem("token")
            }
        }).then(res => {
            setSubmitted(true)
            setData({
              name:"",
              joblevel:"",
              company_website:"",
              category:"",
              no_of_vacancy:"",
              company_name:"",
              location:"",
              offered_salary:"",
              deadline:"",
              type:"",
              image:[],
              description:""
          })
            toast.success('Job Posted Successfully!', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
              router.push('/employer/jobs')
        }).catch(err => {
            setError(true)
            toast.error('Something went wrong!', {
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

    }
    function handleChange(e) {
        // console.log(e.target.files[0]);
        // console.log(e.target.value)
        // setData({...data, [e.target.name]: e.target.value })
        setData({...data, [e.target.name]: e.target.type=="file" ? e.target.files[0] : e.target.value })
    }


  return (
    <div>
        <div className='bg-secondary p-6 text-2xl font-Poppins flex justify-center'>Create A Job</div>
        {
            submitted 
            &&
            <div className='bg-green-300 p-6 text-2xl font-Poppins flex justify-center'>Job Has Been Posted</div>
        }
        {
            error 
            &&
            <div className='bg-red-300 p-6 text-2xl font-Poppins flex justify-center'>Somthing Went Wrong, Please Try Again</div>
        }
        <form onSubmit={handleSubmit} className=' container border max-w-[1000px] w-[70vw] rounded-md flex flex-col gap-8 justify-center align-middle mt-8 mb-8' >
                 <div className='flex w-full flex-col gap-2'>
                    <input type="hidden" id='jobCreator' name='jobCreator'/>
                  </div>
                <div className='flex gap-4 flex-col md:flex-row md:gap-8'>
                <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="website" className='text-lg  text-light-primary'>Company Name <span className='text-red-500'>*</span></label>
                    <input
                      type="text"
                      name='company_name'
                      placeholder='Name'
                      className='input'
                      value={data.company_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="website" className='text-lg  text-light-primary'>Company Website</label>
                    <input
                      type="url"
                      name='company_website'
                      placeholder='Website Link'
                      value={data.company_website}
                      onChange={handleChange}
                      className='input'
                      required
                    />
                  </div>
                </div>


                <div
                  className='flex w-full flex-col gap-2'
                >
                  <label htmlFor="title" className='text-lg  text-light-primary'>Job Title <span className='text-red-500'>*</span></label>
                  <input
                    type="text"
                    name='name'
                    placeholder='Title'
                    className='input'
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>

                <div className='flex gap-4 flex-col md:flex-row md:gap-8'>
                <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="website" className='text-lg  text-light-primary'>Job Category <span className='text-red-500'>*</span> </label>
                    <select className='input' name="category"
                            onChange={handleChange}
                            value={data.category}
                        >
                            <option value="">Select</option>
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="fullstack">Fullstack</option>
                        </select>
                  </div>


                  <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="website" className='text-lg  text-light-primary'>Job Type <span className='text-red-500'>*</span> </label>
                    <select className='input' name="type"
                            onChange={handleChange}
                            value={data.type}
                        >
                            <option value="">Select</option>
                            <option value="hot">Hot</option>
                            <option value="top">Top</option>
                            <option value="featured">Featured</option>
                            <option value="normal">Normal</option>
                        </select>
                  </div>


                </div>
                <div className='flex gap-4 flex-col md:flex-row md:gap-8'>
                <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="website" className='text-lg  text-light-primary'>Job Location <span className='text-red-500'>*</span> </label>
                    <input
                      type="location"
                      name='location'
                      placeholder='Location'
                      className='input'
                      value={data.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="website" className='text-lg  text-light-primary'>Offered Salary <span className='text-red-500'>*</span> </label>
                    <input
                      type="number"
                      name='offered_salary'
                      placeholder='Offered Salary'
                      className='input'
                      onChange={handleChange}
                      value={data.offered_salary}
                      required
                    />
                  </div>
                </div>
                <div className='flex gap-4 flex-col md:flex-row md:gap-8'>
                <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="website" className='text-lg  text-light-primary'>Job Level <span className='text-red-500'>*</span> </label>
                    <select className='input' name="joblevel"
                            onChange={handleChange}
                            value={data.joblevel}
                        >
                            <option value="">Select</option>
                            <option value="fresher">Fresher</option>
                            <option value="junior">Junior</option>
                            <option value="mid">Mid Level</option>
                            <option value="senior">Senior</option>
                        </select>
                  </div>
                  <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="website" className='text-lg  text-light-primary'>No of Vacancy</label>
                    <input
                      type="number"
                      id='website'
                      name='no_of_vacancy'
                      placeholder='No of vancancy'
                      className='input'
                      value={data.no_of_vacancy}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="title" className='text-lg text-light-primary'>Application Deadline <span className='text-red-500'>*</span> </label>
                    <input
                      type="date"
                      id='deadline'
                      name='deadline'
                      placeholder='Application Deadline'
                      className='input'
                      value={data.deadline}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="title" className='text-lg  text-light-primary'>Company Logo <span className='text-red-500'>*</span> </label>
                    <input
                      type="file"
                      name='image'
                      className='input'
                      onChange={handleChange}
                      // value={data.image}
                    />
                  </div>
                  <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="title" className='text-lg  text-light-primary'>Job Description <span className='text-red-500'>*</span> </label>
                    <textarea
                      type="text"
                      name='description'
                      placeholder='Job Description'
                      className='input h-32 max-h-[1000px]'
                      onChange={handleChange}
                      value={data.description}
                    />
                  </div>
                  <div className='align-middle justify-end flex'>
                    <button type='submit' className='btn w-3/2 pl-4 pr-4 mb-8'>
                        Post a Job
                    </button>
                  </div>
              </form>
    </div>
  )
}


export default ProtectedPage(page,'employer');