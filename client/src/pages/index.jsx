import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Home1 from '@/components/home1'
export default function Home( {user} ) {
  return (
    <>
      <Navbar/>
      <Home1 />
    </>
  )
}
