import DishCard from '@/components/DishCard'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'

const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      data {
        id
        attributes {
          name
          dishes {
            data {
              id
              attributes {
                name
                price
              }
            }
          }
        }
      }
    }
  }
`

function Restaurant() {
  const router = useRouter()
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  })
  if (error) return 'Error loading dishes'
  if (loading) return 'Loading'
  if (data.restaurant.data.attributes.dishes.data.length) {
    const { restaurant } = data
    const [...dishes] = data.restaurant.data.attributes.dishes.data
    return (
      <>
        <h1>{restaurant.data.attributes.name}</h1>
        <div className='row'>
          {dishes.map((dish) => {
            return <DishCard data={dish} key={dish.id} />
          })}
        </div>
      </>
    )
  } else {
    return <p>No Dishes Found</p>
  }
}

export default Restaurant
