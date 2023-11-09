import { gql, useQuery } from '@apollo/client'
import React from 'react'

const QUERY = gql`
  {
    restaurants {
      data {
        id
        attributes {
          name
        }
      }
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

  if (data.restaurants.data && data.restaurants.data.length) {
    const searchQuery = data.restaurants.data.filter((query) => {
      return query.attributes.name
        .toLowerCase()
        .includes(props.query.toLowerCase())
    })

    if (searchQuery.length > 0) {
      return (
        <div className='row'>
          {searchQuery.map((res) => {
            return (
              <div key={res.id} className='card col-4'>
                <div className='card-body'>
                  <h2 className='card-title'>{res.attributes.name}</h2>
                  <ul className='d-flex justify-content-between'>
                    <li>Star Rating</li>
                    <li>Price Point</li>
                  </ul>
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
