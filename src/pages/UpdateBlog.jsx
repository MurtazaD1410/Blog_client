import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import FileBase64 from 'react-file-base64'



const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState('')
  const [error, setError] = useState(null)
  const [blog, setBlog] = useState({
    title: '',
    desc: '',
    photo: ''
  })
  const { user } = useAuthContext()

  useEffect(() => {
    const BlogDetail = async () => {
      const res = await fetch(`/api/blog/${id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
      const data = await res.json()
      setBlog({
        title: data.title,
        desc: data.desc,
        photo: data.photo
      })

    }
    BlogDetail()


  }, [id, user.token])

  const onChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  if (!blog) return <div className="max-w-[1400px] px-5 lg:mx-auto" >Loading...</div>


  const removePhoto = (e) => {
    e.preventDefault()
    setPhotoUrl('')
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      title: blog.title,
      desc: blog.desc,
      photo: photoUrl
    }
    const response = await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${user.token}` },
      body: JSON.stringify(data)
    })
    const json = await response.json()


    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {

      setError(null)
      console.log('New blog added', json)
      navigate('/')
    }
  }


  return (
    <div className='max-w-[1400px] px-5 lg:mx-auto'>
      <h5 className="my-6 font-medium text-2xl" >Update Blog</h5>
      <form action=""
        // onSubmit={handleSubmit}
        className='flex flex-col space-y-5'>
        <div className="flex flex-col space-y-7">
          <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="text-gray-500 text-sm" >Title</label>
            <input type="text" name="title" id="title"
              value={blog.title}
              onChange={onChange}
              className='border border-gray-300 rounded-md p-2'
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="text-gray-500 text-sm" >Description</label>
            <textarea type="text" value={blog.desc} name='desc' id='desc'
              className='border border-gray-300 h-fit min-h-[150px] rounded-md p-2'
              onChange={onChange} />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="text-gray-500 text-sm" >Image</label>
            <div>
              <FileBase64
                name="photo"
                multiple={false}
                onDone={({ base64 }) => { setPhotoUrl(base64) }} />

              <button className='bg-[#dcdcdc] text-[16px] py-1 px-3 rounded-md font-medium remove' onClick={removePhoto}>Remove Photo</button>
            </div>
          </div>
          <button className='border border-blue-600 py-2 px-7 items-start w-40 text-blue-600 rounded-xl' onClick={handleSubmit}>Update Blog</button>
          {error && <div className='bg-red-100 p-3 border-red-500 border rounded-xl'>{error}</div>}
        </div>
      </form>
    </div>
  )
}

export default UpdateBlog