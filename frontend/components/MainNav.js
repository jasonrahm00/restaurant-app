import Link from 'next/link'
import React from 'react'
import { Nav, NavItem, Navbar } from 'reactstrap'
import { useAppContext } from './AppContext'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

function MainNav() {
  const { user, setUser } = useAppContext()
  const router = useRouter()

  function handleLogout() {
    setUser(null)
    Cookies.remove('token')
    router.push('/')
  }

  return (
    <Navbar className='navbar navbar-expand navbar-dark bg-dark'>
      <Link href='/' className='navbar-brand'>
        Home
      </Link>
      <Nav navbar className='ml-auto'>
        {user ? (
          <>
            <NavItem className='nav-link'>{user.email}</NavItem>
            <NavItem>
              <button className='nav-link' onClick={handleLogout}>
                Log Out
              </button>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <Link href='/login' className='nav-link'>
                Sign In
              </Link>
            </NavItem>
            <NavItem>
              <Link href='/register' className='nav-link'>
                Sign Up
              </Link>
            </NavItem>
          </>
        )}
      </Nav>
    </Navbar>
  )
}

export default MainNav
