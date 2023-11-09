import RestaurantList from '@/components/RestaurantList'
import { useState } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  return (
    <>
      <h1>Home</h1>
      <div className='mb-6'>
        <input
          type='text'
          className='block w-full'
          placeholder='Search Restaurants'
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <RestaurantList query={query} />
    </>
  )
}
