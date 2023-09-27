'use client'
import AppliedTable from '@components/AppliedTable'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'




export default function page({id}) {
    const {slug} = useParams(); 
    const [application, setApplications] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8001/api/jobs/employer/${slug}`,{
          headers: {
            Authorization : "Bearer " +localStorage.getItem("token")

          }
        })
        .then(res => {
          console.log(res.data)
          setApplications(res.data)
        })
    },[])
  return (
    <>

      <div class="relative overflow-x-auto container">
          <table class="w-full text-sm text-left  border">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                      <th className="px-6 py-3">
                          Name
                      </th>
                      <th className="px-6 py-3">
                          Email
                      </th>
                  </tr>
              </thead>
              <tbody>
              {
                application.map(applies => {
                  return <>
                      <tr className='bg-white border '>
                        <td  className='px-6 py-4'> {applies?.name}</td>
                        <td  className='px-6 py-4'>{applies?.email}</td>
                      </tr>
                      </>
                })
              }
              </tbody>
          </table>
      </div>

    </>
    

  )
}
