import Link from 'next/link'
import React from 'react'
import { Nav, NavItem, Navbar } from 'reactstrap'

function MainNav() {
  return (
    <Navbar className='navbar navbar-expand navbar-dark bg-dark'>
      <Link href='/' className='navbar-brand'>
        Home
      </Link>
      <Nav navbar className='ml-auto'>
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
        <NavItem>
          <Link href='#' className='nav-link'>
            Logout
          </Link>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default MainNav
