import { useAppContext } from '@/components/AppContext'
import Error from 'next/error'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

function LoginRedirect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setUser } = useAppContext()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(
          `${backendUrl}/auth/google/callback?${searchParams}`
        )
        const googleObject = await response.json()
        setUser(googleObject.user)
        Cookies.set('token', googleObject.jwt)
        setTimeout(() => router.push('/'), 2000)
      } catch (err) {
        throw new Error(`Couldn't login to Strapi. Status: ${err.status}`)
      }
    })()
  }, [searchParams])

  return <div>Successfully Logged In. You will be redirected shortly</div>
}

export default LoginRedirect
