"use client"
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from './redux/provider'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setReduxUser, stopLoading } from './redux/slice/userSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Layout({children}) {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem("token")) {
        axios.get("http://localhost:8001/api/user",{
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
                <ToastContainer />
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
