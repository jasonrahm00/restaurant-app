import MainNav from '@/components/MainNav'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Container } from 'reactstrap'
const Cart = dynamic(() => import('../components/Cart'), { ssr: false })

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>Restaurant App</title>
      </Head>
      <MainNav />
      <Container tag='main'>{children}</Container>
      <Cart />
    </>
  )
}
