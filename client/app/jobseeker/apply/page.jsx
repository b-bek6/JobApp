'use client'
import ProtectedPage from '@components/ProtectedPage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export function page() {
  const [applies, setApplies] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8001/api/apply',{
          headers: {
            Authorization : "Bearer " +localStorage.getItem("token")

          }
        })
        .then(res => {
          console.log(res.data)
          // setApplies(res.data)
        })
    },[])
  return (
    <div>page</div>
  )
}

export default ProtectedPage(page,'jobseeker')
