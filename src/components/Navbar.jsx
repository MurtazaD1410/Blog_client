import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'



const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <div className='flex h-[80px] justify-between items-center max-w-[1400px] px-5 lg:mx-auto'>
      <Link to='/' className=''>
        <img src={logo} alt="" className='w-16 sm:w-24 md:w-56' />
      </Link>
      <nav>

        {user && (
          <div className="space-x-3 md:space-x-5 text-xs md:text-base">
            <button onClick={handleClick}>Log Out</button>
            <Link to='/createblog'>Create Blog</Link>
            <Link to={`/myBlog`}>My Blogs</Link>
          </div>)}
        {!user && (
          <div className="space-x-3 md:space-x-5 text-xs md:text-base">
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
          </div>)}

      </nav>
    </div>
  )
}

export default Navbar