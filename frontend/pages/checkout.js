import CheckoutForm from '@/components/CheckoutForm'
import { useInitialRender } from '@/utils/useInitialRender'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'

/**
 * 
 *
mutation CreateOrder {
  createOrder(input: {data: {
    address: "123 Street",
    amount: 120,
    dishes: {},
    token: "12345",
    city:"City",
    state: "CO",
    charge_id: "123454"
  }})
  {
    order {
      address
    }
  }
}
 */
const stripePublicKey =
  'pk_test_51OBlYLAKYJ4RdA10b1tsrszMKc18QbnOoaoQjURutO55wmAh87z8pBo4HhjxlUcrAK8zmhIqenZDNOphNuVI21R000y6yXcfeK'
const stripePromise = loadStripe(stripePublicKey)

function Checkout() {
  const initialRender = useInitialRender()
  if (!initialRender) return null

  return (
    <>
      <h1>Checkout</h1>
      <div className='row'>
        <section className='col-4'>
          <h2>Your Cart</h2>
          <p>Need new component to just display cart items</p>
          <p>Hide regular cart.</p>
          <p>Data is coming from context</p>
        </section>
        <section className='col-6 offset-2'>
          <h2>Payment Information</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </section>
      </div>
    </>
  )
}

export default Checkout
