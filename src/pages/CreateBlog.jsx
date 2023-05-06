import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import FileBase64 from 'react-file-base64'

const CreateBlog = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [photo, setPhoto] = useState('')
  const [error, setError] = useState(null)
  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const blog = { title, desc, photo }

    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",

        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(blog)
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setTitle('')
      setDesc('')
      setPhoto('')
      setError(null)
      console.log('New blog added', json)
      navigate('/')
    }
  }




  return (
    <div className='max-w-[1400px] px-5 lg:mx-auto'>
      <h5 className="my-6 font-medium text-2xl" >Create Blog</h5>
      <form action="" onSubmit={handleSubmit} className='flex flex-col space-y-5'>
        <div className="flex flex-col space-y-7">
          <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="text-gray-500 text-sm" >Title</label>
            <input type="text" name="title" id="title"
              value={title}
              className={'border border-gray-300 rounded-md p-2'}
              onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="text-gray-500 text-sm" >Description</label>
            <textarea type="text" value={desc}
              className={'border border-gray-300 h-fit min-h-[150px] rounded-md p-2'}
              onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="text-gray-500 text-sm" >Image</label>
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => { setPhoto(base64) }} />
          </div>
          <button className='border border-blue-600 py-2 px-7 items-start w-40 text-blue-600 rounded-xl'>Add Blog</button>
          {error && <div className='bg-red-100 p-3 border-red-500 border rounded-xl'>{error}</div>}
        </div>
      </form>
    </div>
  )
}

export default CreateBlog