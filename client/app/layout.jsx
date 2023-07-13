"use client"
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from './redux/provider'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setReduxUser, stopLoading } from './redux/slice/userSlice'


export function Layout({children}) {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem("token")) {
        axios.get("https://job-1c3nlgegi-b-bek6.vercel.app/api/user",{
        headers:{
          Authorization : "Bearer " + localStorage.getItem("token") 
        }
      }).then (res => {
        dispatch(setReduxUser(res.data))
      })
    } else {
      dispatch(stopLoading);
    }
  },[])
  

  return (
      <html lang='en'>
        <body>
            <main className='app'>
                <Navbar/>
                {children}
                <Footer/>
            </main>
        </body>
    </html>
  )
}

// higher order component

export default function withRedux({children}) {
  return <>
  <Providers>
    <Layout children={children} />
  </Providers>
  </>
}
