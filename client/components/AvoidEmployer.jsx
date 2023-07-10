'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Spinner from './Spinner'

export default function ProtectedPage(PageComponent) {
    function wrapper() {

        const  redux_user = useSelector((store)=> store.user.value)
        let router = useRouter();
        if(redux_user?.role == "employer"){
            return <>
                <div className='container flex justify-center align-middle items-center text-xl'>
                    Forbidden Access
                </div>
            </>
        }
        return <>
            <PageComponent />
        </>
    }
  return wrapper
}
