import React from 'react'
import { useAppContext } from './AppContext'

function DishCard({ data }) {
  const { addItem, setShowCart, imageRoot } = useAppContext()

  function handleAddItem() {
    addItem(data)
    setShowCart(true)
  }

  return (
    <section className='card col-3'>
      <h2 className='card-title'>{data.name}</h2>
      <img src={`${imageRoot}${data.image.url}`} alt='' />
      <p>${data.price}</p>
      <button onClick={handleAddItem}>Add to Cart</button>
    </section>
  )
}

export default DishCard
