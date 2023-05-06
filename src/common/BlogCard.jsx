import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/${blog._id}`}  >
      <div className='shadow-md my-5 rounded-md p-4 flex flex-col space-y-5 bg-white'>
        <div className="flex flex-col space-y-2 ">
          <p className="text-xl text-gray-900 " >{blog.title}</p>
          <p className='text-sm text-gray-500'>By <span className="text-blue-600 text-sm" >{blog.author}</span></p>
        </div>
        <div className="">
          <img src={blog.photo || null} alt="" className='float-left h-full max-h-[600px] mr-3 mb-3 rounded-md' />
          <p className="text-gray-700 break-all text-base" >{blog.desc}</p>
        </div>
        <p className="text-gray-500 text-xs" >Created On {format(new Date(blog.createdAt), 'dd/MM/yyyy')}</p>
      </div>
    </Link>
  )
}

export default BlogCard