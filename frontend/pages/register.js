import { useAppContext } from '@/components/AppContext'
import { gql, useMutation } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Form from '@/components/Form'
import Cookies from 'js-cookie'

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        username
        email
      }
    }
  }
`
function Register() {
  const { setUser } = useAppContext()
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION)

  const handleRegister = async () => {
    const { email, password } = formData
    const { data } = await registerMutation({
      variables: { username: email, email, password },
    })
    if (data?.register.user) {
      setUser(data.register.user)
      router.push('/')
      Cookies.set('token', data.register.jwt)
    }
  }

  if (loading) return <p>Loading</p>

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Form
        title='Register'
        formData={formData}
        setFormData={setFormData}
        callback={handleRegister}
        error={error}
      />
    </>
  )
}

export default Register
