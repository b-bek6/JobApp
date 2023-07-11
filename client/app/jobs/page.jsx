'use client'
import { useEffect, useState } from 'react';
import Job from '@components/Job';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function page(ctx) {
  console.log(ctx)
  const router = useRouter()
  const [jobs, setJobs] = useState([])
  let get
  useEffect(()=>{
    axios.get(`http://localhost:8001/api/jobs?search_term=${ctx?.searchParams?.search_term}`).then(response => {
      setJobs(response.data.data[0].jobs);
  });
  },[]);

    function handleSearch (e) {
      e.preventDefault()
      router.push(`/jobs?search_term=${e.target.search_term.value}`)
    }
  
  return (
    <div>
        <div className='bg-secondary p-6 text-2xl font-Poppins flex justify-center'>All Popular Listed Jobs</div>
        <div className='border bg-secondary p-6 flex justify-around'>
        <div className='flex gap-2'>
                    <label htmlFor="type" className='text-lg  text-light-primary'>Per Page</label>
                    <select  className=' border-2 rounded-md text-light-primary'name='type'>
                      <option selected value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                    </select>
          </div>
          <form onSubmit={handleSearch}>
              <span><input type="text" name='search_term' className='border outline-none p-1.5 px-3 font-sans' /></span>
              <button type='submit' className='border rounded-md font-bolt bg-primary text-white p-1.5'>
                Search
              </button>
            </form>
        </div>
        <div className=' container grid'>
        
      {
        jobs?.map(job => {
          return <>
            <Job job={job}/>
          </>
        })
      }
      </div>
      <div className='flex justify-center'>
        <button className='btn mb-3'> <Link href={'/jobs'}>View More</Link> </button>
      </div>
      
    </div>
  )
}

// export async function getServerSideProps(ctx){
//   let res = await axios.get('http://localhost:8001/api/jobs')
// }