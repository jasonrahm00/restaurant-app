import { gql } from '@apollo/client'
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
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser()
      setUser(userData)
    }
    fetchData()
  }, [])

  return (
    <AppContext.Provider value={{ user, setUser }}>
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
