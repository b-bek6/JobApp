import React from 'react'

export default function JobForm() {
  return (
    <div>
        <div className='bg-secondary p-6 text-2xl font-Poppins flex justify-center'>Edit A Job</div>
        {
            submitted 
            &&
            <div className='bg-green-300 p-6 text-2xl font-Poppins flex justify-center'>Job Has Been Modified</div>
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
                    <label htmlFor="website" className='text-lg  text-light-primary'>Company Name</label>
                    <input
                      type="text"
                      name='company_name'
                      placeholder='Name'
                      className='input'
                      value={data.company_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="website" className='text-lg  text-light-primary'>Company Website</label>
                    <input
                      type="text"
                      name='website'
                      placeholder='Website Link'
                      className='input'
                    />
                  </div>
                </div>


                <div
                  className='flex w-full flex-col gap-2'
                >
                  <label htmlFor="title" className='text-lg  text-light-primary'>Job Title</label>
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
                    <label htmlFor="website" className='text-lg  text-light-primary'>Job Category</label>
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
                    <label htmlFor="website" className='text-lg  text-light-primary'>Job Type</label>
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
                    <label htmlFor="website" className='text-lg  text-light-primary'>Job Location</label>
                    <input
                      type="location"
                      name='location'
                      placeholder='Location'
                      className='input'
                      value={data.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="website" className='text-lg  text-light-primary'>Offered Salary</label>
                    <input
                      type="number"
                      name='offered_salary'
                      placeholder='Offered Salary'
                      className='input'
                      onChange={handleChange}
                      value={data.offered_salary}
                    />
                  </div>
                </div>
                <div className='flex gap-4 flex-col md:flex-row md:gap-8'>
                <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="website" className='text-lg  text-light-primary'>Job Level</label>
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
                    <label htmlFor="title" className='text-lg text-light-primary'>Application Deadline</label>
                    <input
                      type="date"
                      id='deadline'
                      name='deadline'
                      placeholder='Application Deadline'
                      className='input'
                      value={data.deadline}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="title" className='text-lg  text-light-primary'>Job Application Link</label>
                    <input
                      type="text"
                      id='applicationLink'
                      name='applicationLink'
                      placeholder='Job Application Link'
                      className='input'
                    />
                  </div>
                  <div
                    className='flex w-full flex-col gap-2'
                  >
                    <label htmlFor="title" className='text-lg  text-light-primary'>Job Description</label>
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
                        Edit a Job
                    </button>
                  </div>
              </form>
    </div>
  )
}
