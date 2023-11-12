import { useRouter } from 'next/router'
import React from 'react'
import { useAppContext } from './AppContext'
import CartItem from './CartItem'

function Cart() {
  const router = useRouter()
  const { user, cart, showCart, setShowCart } = useAppContext()
  const total = cart.total
  const displayTotal = Math.abs(total)

  // redirect user to login if they aren't logged in
  function loginRedirect() {
    router.push('/login')
  }

  // send to checkout page
  function cartRedirect() {
    setShowCart(false)
    router.push('/checkout')
  }

  return (
    <section className='container mt-5'>
      <button onClick={() => setShowCart((prevState) => !prevState)}>
        Show/Hide Cart
      </button>
      {showCart && (
        <>
          <h2>Your Cart</h2>
          {cart.items
            ? cart.items.map((item, index) => {
                if (item.quantity > 0) {
                  return <CartItem key={index} data={item} />
                }
              })
            : null}
          <div>
            <b>Total:</b> {displayTotal}
          </div>
          <button onClick={() => (user ? cartRedirect() : loginRedirect())}>
            {user ? 'Continue to Pay' : 'Login to Order'}
          </button>
        </>
      )}
    </section>
  )
}

export default Cart
