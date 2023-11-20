import React, { useState } from 'react'
import { useAppContext } from './AppContext'
import { useInitialRender } from '@/utils/useInitialRender'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/router'
import { client } from '@/pages/_app'
import { gql } from '@apollo/client'
import Cookies from 'js-cookie'

const INITIAL_STATE = {
  address: '',
  city: '',
  state: '',
  error: null,
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

function CheckoutForm() {
  const [data, setData] = useState(INITIAL_STATE)
  const [loading, setLoading] = useState(false)
  const { user, cart, resetCart, setShowCart } = useAppContext()
  const initialRender = useInitialRender()

  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  if (!initialRender) return null

  function onChange(e) {
    const updateItem = (data[e.target.name] = e.target.value)
    setData({ ...data, updateItem })
  }

  async function submitOrder(e) {
    e.preventDefault()
    const cardElement = elements.getElement(CardElement)
    const token = await stripe.createToken(cardElement)

    if (data.address === '') {
      setData({ ...data, error: { message: 'Address is required' } })
      return
    }

    if (data.city === '') {
      setData({ ...data, error: { message: 'City is required' } })
      return
    }

    if (data.state === '') {
      setData({ ...data, error: { message: 'State is required' } })
      return
    }

    if (token.error) {
      setData({ ...data, error: { message: token.error.message } })
      return
    }

    const userToken = Cookies.get('token')

    const response = await fetch(`${backendUrl}/orders`, {
      method: 'POST',
      headers: userToken && { Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({
        amount: Number(cart.total),
        dishes: cart.items,
        address: data.address,
        city: data.city,
        state: data.state,
        token: token.token.id,
      }),
    })

    if (!response.ok) {
      setData({ ...data, error: { message: 'Unable to complete order' } })
      console.log(response)
    } else {
      resetCart()
      router.push('/confirmation')
    }
  }

  return (
    <form>
      <hr className='my-4' />
      <div className='bg-white shadow-md rounded p-8'>
        <div className='flex mb-6'>
          <label htmlFor='address' className='block font-medium'>
            Address
          </label>
          <input
            type='text'
            name='address'
            id='address'
            className='appearance-none'
            onChange={onChange}
          />
        </div>
        <div className='flex mb-6'>
          <label htmlFor='city' className='block font-medium'>
            City
          </label>
          <input
            type='text'
            name='city'
            id='city'
            className='appearance-none'
            onChange={onChange}
          />
        </div>
        <div className='flex mb-6'>
          <label htmlFor='state' className='block font-medium'>
            State
          </label>
          <input
            type='text'
            name='state'
            id='state'
            className='appearance-none'
            onChange={onChange}
          />
        </div>
      </div>
      {cart.items.length > 0 ? (
        <div className='p-6'>
          <div>Credit or Debit Card</div>
          <div className='my-4'>
            <CardElement />
          </div>
          <button
            onClick={(e) => (user ? submitOrder(e) : router.push('/login'))}
            disabled={loading}
          >
            {loading ? 'Submitting' : 'Submit Order'}
          </button>
        </div>
      ) : (
        <p>Your Cart is Empty</p>
      )}
      <div>
        {data.error && (
          <p className='danger'>
            <b>Error! </b>
            <span>{data.error.message}</span>
          </p>
        )}
      </div>
    </form>
  )
}

export default CheckoutForm
