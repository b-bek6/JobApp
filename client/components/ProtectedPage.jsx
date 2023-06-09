'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './Spinner'

export default function ProtectedPage(PageComponent, role) {
    function wrapper() {
        const {isLoading, value:redux_user} = useSelector((store)=> {return store.user})
        let router = useRouter();

        if(isLoading){
            return <Spinner />
        } else if (!redux_user){
            router.push("/login");
        } else if(role && redux_user?.role !== role){
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
