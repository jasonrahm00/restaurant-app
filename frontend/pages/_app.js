import Layout from './layout'
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { AppProvider } from '@/components/AppContext'

const API_URL = process.env.STRAPI_URL || 'http://localhost:1337'

export const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </ApolloProvider>
  )
}
