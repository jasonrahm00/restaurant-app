import MainNav from '@/components/MainNav'
import Head from 'next/head'
import { Container } from 'reactstrap'

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>Restaurant App</title>
      </Head>
      <MainNav />
      <Container tag='main'>{children}</Container>
    </>
  )
}
