import { empty, gql } from '@apollo/client'
import Cookies from 'js-cookie'
import { createContext, useState, useEffect, useContext } from 'react'

const AppContext = createContext()

const getUser = async () => {
  const token = Cookies.get('token')
  if (!token) return null
  const { data } = await client.query({
    query: gql`
      query {
        me {
          id
          email
          username
        }
      }
    `,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
  return data.me
}

export const AppProvider = ({ children }) => {
  const cartCookie =
    Cookies.get('cart') !== 'undefined' ? Cookies.get('cart') : null
  const emptyCart = { items: [], total: 0 }
  const [user, setUser] = useState(null)
  const [showCart, setShowCart] = useState(true)
  const [cart, setCart] = useState(
    cartCookie ? JSON.parse(cartCookie) : emptyCart
  )

  // set user state
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser()
      setUser(userData)
    }
    fetchData()
  }, [])

  // set cart contents
  // updates whenever cart changes
  useEffect(() => {
    Cookies.set('cart', JSON.stringify(cart))
  }, [cart])

  // add item to cart
  const addItem = (item) => {
    // see if already exists in cart
    let newItem = cart.items.find((i) => i.id === item.id)

    if (!newItem) {
      // add to cart if it doesn't already exist
      const newItem = { quantity: 1, ...item }
      setCart((prevCart) => ({
        items: [...prevCart.items, newItem],
        total: prevCart.total + item.price,
      }))
    } else {
      // update cart if already exists
      setCart((prevCart) => ({
        items: prevCart.items.map((i) => {
          return i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        }),
        total: prevCart.total + item.price,
      }))
    }
  }

  // remove item from cart
  const removeItem = (item) => {
    let newItem = cart.items.find((i) => i.id === item.id)

    // see if there is more than one of an item
    if (newItem.quantity > 1) {
      // decrement by one if there are multiples
      setCart((prevCart) => ({
        items: prevCart.items.map((i) => {
          return i.id === newItem.id ? { ...i, quantity: i.quantity - 1 } : i
        }),
        total: (prevCart.total = item.price),
      }))
    } else {
      // otherwise remove item completely
      setCart((prevCart) => ({
        items: prevCart.items.filter((i) => i.id !== item.id),
        total: prevCart.total - item.price,
      }))
    }
  }

  // empty cart
  const resetCart = () => {
    setCart(emptyCart)
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        addItem,
        removeItem,
        resetCart,
        showCart,
        setShowCart,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be within an AppProvider')
  }
  return context
}
