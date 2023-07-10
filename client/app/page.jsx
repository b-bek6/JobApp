'use client'
import Home1 from "@/components/Home"
import Jobs from "@components/Jobs"
import { useSelector } from "react-redux"
import EmployerJobs from "@components/EmployerJobs"

export default function Home() {
  const redux_user = useSelector(store=> store.user.value);

  return (
    <div>
        <Home1 />
        {
          redux_user?.role == 'employer'
          ?
          <EmployerJobs />
          :
          <Jobs/>
        }
    </div>
  )
}
