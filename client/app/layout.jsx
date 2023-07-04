import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'


export default function layout({children}) {
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
