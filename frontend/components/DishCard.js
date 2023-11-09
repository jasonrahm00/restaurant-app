import React from 'react'
import { useAppContext } from './AppContext'

function DishCard({ data }) {
  const { addItem, setShowCart } = useAppContext()

  function handleAddItem() {
    addItem(data)
    setShowCart(true)
  }

  return (
    <section className='card col-3'>
      <h2 className='card-title'>{data.attributes.name}</h2>
      <p>${data.attributes.price}</p>
      <button onClick={handleAddItem}>Add to Cart</button>
    </section>
  )
}

export default DishCard
