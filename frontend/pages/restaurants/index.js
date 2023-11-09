import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
function Restaurants() {
  const router = useRouter()
  useEffect(() => {
    router.push('/')
  }, [])
  return <div>You will be redirected to the homepage</div>
}

export default Restaurants
