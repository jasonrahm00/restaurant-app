import React from 'react'
import { useAppContext } from './AppContext'

function CartItem({ data }) {
  const { addItem, removeItem } = useAppContext()
  const { quantity, attributes } = data

  return (
    <section>
      <h3>{attributes.name}</h3>
      <span>
        {quantity} x {attributes.price}
      </span>
      <div className='d-flex justify-content-between'>
        <button onClick={() => removeItem(data)}>Remove One</button>
        <button onClick={() => addItem(data)}>Add One</button>
      </div>
      <span>{attributes.price * quantity}</span>
    </section>
  )
}

export default CartItem
