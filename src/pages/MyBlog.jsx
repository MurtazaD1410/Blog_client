import React, { useEffect, useState } from 'react'
import BlogCard from '../common/BlogCard';
import { useAuthContext } from '../hooks/useAuthContext';

const MyBlog = () => {

  const [blogs, setBlogs] = useState(null)
  const { user } = useAuthContext()


  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch(`/api/blog/user/${user.user._id}`);
      const json = await res.json();

      if (res.ok) {
        setBlogs(json);
      }

    }
    fetchBlogs();
  }, [user.user._id]);


  return (
    <div className=' max-w-[1400px] px-5 lg:mx-auto'>
      <h5 className="my-6 font-medium text-2xl" >All Blogs</h5>

      {
        blogs?.length === 0 ? <p className="text-gray-500" >No blogs to show</p> : blogs && blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))
      }


    </div>
  )
}

export default MyBlog