import { gql, useQuery } from '@apollo/client'
import React from 'react'

const QUERY = gql`
  {
    restaurants {
      id
      name
    }
  }
`

function RestaurantList(props) {
  const { loading, error, data } = useQuery(QUERY)

  if (error) {
    console.log(error)
    return <p>Error Loading Restaurants</p>
  }

  if (loading) return <p>Loading</p>

  if (data.restaurants && data.restaurants.length) {
    const searchQuery = data.restaurants.filter((query) => {
      return query.name.toLowerCase().includes(props.query.toLowerCase())
    })

    if (searchQuery.length > 0) {
      return (
        <div className='row'>
          {searchQuery.map((res) => {
            return (
              <div key={res.id} className='card col-4'>
                <div className='card-body'>
                  <h2 className='card-title'>{res.name}</h2>
                  <a href={`/restaurants/${res.id}`}>Go to Restaurant</a>
                </div>
              </div>
            )
          })}
        </div>
      )
    } else {
      return <p>No Restaurants Found</p>
    }
  }
}

export default RestaurantList
