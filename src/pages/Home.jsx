import React, { useEffect, useState } from 'react'
import BlogCard from '../common/BlogCard'
import { useAuthContext } from '../hooks/useAuthContext'


const Home = () => {
  const [blogs, setBlogs] = useState(null)
  const { user } = useAuthContext()


  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blog');
      const json = await res.json();

      if (res.ok) {
        setBlogs(json);
      }
    }
    fetchBlogs();
  }, []);



  return (
    <div className=' max-w-[1400px] px-5 lg:mx-auto'>
      {user && (<h4 className='my-5 font-light text-base md:text-lg'>Hey! <span className='text-blue-600 font-medium'>{user.user.email}</span></h4>)}
      {!user && (<h4 className='my-5 font-light text-base md:text-lg'>Hey! <span className='text-blue-600 font-medium'>Visitor</span></h4>)}

      <h5 className="my-6 font-medium text-lg md:text-2xl" >Read all Our Amazing Blogs Here</h5>

      {
        blogs?.length === 0 ? <p className="text-gray-500" >No blogs to show</p> : blogs && blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))
      }


    </div>

  )
}

export default Home