import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { useAuthContext } from '../hooks/useAuthContext'


const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuthContext()
  const [logedUser, setLogedUser] = useState(null)
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const BlogDetail = async () => {
      const res = await fetch(`/api/blog/${id}`)
      const data = await res.json()
      setBlog(data)
    }

    BlogDetail()

  }, [id])

  useEffect(() => {

    if (user) {
      setLogedUser(user.user._id)
    }
  }, [user])

  const handleDelete = async () => {
    const res = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    if (res.ok) {
      navigate('/')
    }

  }



  if (!blog) return <div className="max-w-[1400px] px-5 lg:mx-auto" >Loading...</div>


  return (
    <div className=" max-w-[1400px] px-5 lg:mx-auto my-10">

      <div className='p-4 bg-white py-8 flex flex-col space-y-5 rounded-lg'>
        <div className="flex flex-col space-y-2 ">
          <p className="text-2xl text-gray-900 " >{blog.title}</p>
          <p className="text-blue-600 text-sm" >{blog.author}</p>
        </div>
        <div className="">
          <img src={blog.photo || null} alt="" className='float-left h-full mr-3 mb-3 rounded-md max-h-[600px]' />
          <p className="text-gray-700 break-all text-base" >{blog.desc}</p>
        </div>
        <p className="text-gray-500 text-xs" >{format(new Date(blog.createdAt), 'dd/MM/yyyy')}</p>
        {logedUser === blog?.user_id ?
          <div className="flex space-x-7 pt-10 ">
            <button className='border border-red-600 text-red-600 font-semibold py-2 px-8 rounded-xl' onClick={handleDelete}>Delete</button>
            <Link to={`/update/${id}`}>
              <button className='border border-green-600 text-green-600 font-semibold py-2 px-8 rounded-xl' >Update</button></Link>
          </div> : null}
      </div>

    </div>
  )
}

export default BlogDetail