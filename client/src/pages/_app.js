import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component user="ram" {...pageProps} />
}
