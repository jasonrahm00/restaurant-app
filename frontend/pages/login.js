import { useAppContext } from '@/components/AppContext'
import Form from '@/components/Form'
import { gql, useMutation } from '@apollo/client'
import Cookies from 'js-cookie'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        username
        email
      }
    }
  }
`
function Login() {
  const { setUser } = useAppContext()
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION)

  const handleLogin = async () => {
    const { email, password } = formData
    const { data } = await loginMutation({
      variables: { identifier: email, password },
    })
    if (data?.login.user) {
      setUser(data.login.user)
      Cookies.set('token', data.login.jwt)
      router.push('/')
    }
  }

  if (loading) return <p>Loading</p>

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Form
        title='Login'
        formData={formData}
        setFormData={setFormData}
        callback={handleLogin}
        error={error}
      />
    </>
  )
}

export default Login
