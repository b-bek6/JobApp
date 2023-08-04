'use client'
import ProtectedPage from '@components/ProtectedPage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AppliedTable from '@components/AppliedTable'

export function page() {
  const [applies, setApplies] = useState([])

    useEffect(()=>{
        axios.get('https://job-app-ashy-theta.vercel.app/api/apply',{
          headers: {
            Authorization : "Bearer " +localStorage.getItem("token")

          }
        })
        .then(res => {
          console.log(res.data)
          setApplies(res.data)
        })
    },[])
  return (
    <> 
<div class="relative overflow-x-auto container">
          <table class="w-full text-sm text-left  border">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                      <th className="px-6 py-3">
                          Title
                      </th>
                      <th className="px-6 py-3">
                          Job Type
                      </th>
                      <th className="px-6 py-3">
                          Posted Date
                      </th>
                      <th className="px-6 py-3">
                          Application Deadline
                      </th>
                      <th className="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
              {
                applies.map(applies => {
                  return <>
                        <AppliedTable id={applies.applied_jobs[0].job_id} />
                      </>
                })
              }
              </tbody>
          </table>
      </div>
      
    </>
  )
}

export default ProtectedPage(page,'jobseeker')
