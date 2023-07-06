import Home1 from "@/components/Home"
import Jobs from "@components/Jobs"
import axios from "axios"


export default function Home({user}) {
  return (
    <div>
        <Home1 />
        <Jobs/>
    </div>
  )
}
