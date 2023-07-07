import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from './redux/provider'


export default function layout({children}) {
  return (
      <html lang='en'>
        <body>
            <main className='app'>
              <Providers>
                <Navbar/>
                {children}
                <Footer/>
                </Providers>
            </main>
        </body>
    </html>
  )
}
