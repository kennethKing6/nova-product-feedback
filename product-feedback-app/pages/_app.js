import { useEffect } from 'react'
import '../styles/globals.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.js')
  }, [])

  return <QueryClientProvider client={queryClient}> <Component {...pageProps} /> </QueryClientProvider>
}

export default MyApp
