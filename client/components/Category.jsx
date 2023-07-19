'use client'
import { useEffect, useState } from 'react';
import {BiCube} from 'react-icons/bi'
import axios from 'axios';



export default function Category() {
  const [jobs, setJobs] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8001/api/jobs?per_page=3').then(response => {
      console.log(response.data.data[0].jobs);
      setJobs(response.data.data[0].jobs);
  });
  },[]);

  let cats = [
    {
        name:'Information Technology (IT)'
    },{
        name:'Engineering'
    },{
        name:'Customer Service'
    },
    {
        name:'Healthcare'
    },{
        name:'Education and Training'
    },{
        name:'Creative and Design'
    },{
        name:'Helper'
    },{
        name:'Finance and Accounting'
    },{
        name:'Sales and Marketing'
    },{
        name:'Finance and Accounting'
    }
  ]
  
  return (
    <div className='bg-secondary'>
        <div className='container grid  justify-center align-middle items-center'>
            <div className='bg-secondary p-6 text-2xl font-Poppins flex justify-center'>Popular Categories</div>

            <div className='flex align-middle justify-center items-center'>
            <div className='grid md:grid-cols-3 xl:grid-cols-4 m-4 gap-4 justify-center align-middle items-center '>
                {
                    cats.map(cat  => {
                        return <>
                            <div className=' flex md:flex-col gap-4 p-2 flex-row items-center  md:justify-center align-middle h-[50px] w-[250px] md:w-[230px] md:h-[150px] rounded-md shadow-xl ease-in-out bg-white hover:-translate-y-1 hover:scale-105 hover:border-green-300 duration-100'>
                                <div className='rounded-full bg-slate-200  '>
                                    < BiCube className='m-3 md:m-5'/>
                                </div>
                                <div>{cat.name}</div>
                                </div>
                        </>
                    })
                }
            </div>
            </div>
        </div>
      
    </div>
  )
}
