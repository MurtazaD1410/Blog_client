import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const { signup, error, isLoading } = useSignup()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password)
  }


  return (
    <form className="p-5 bg-white rounded-lg w-full max-w-[400px] mx-auto my-10 flex flex-col space-y-5 " onSubmit={handleSubmit}>
      <h3 className="my-6 font-medium text-2xl">Sign Up</h3>
      <div className="flex flex-col space-y-1">
        <label className="text-gray-500 text-sm" >Email:</label>
        <input type="" className="border border-gray-300 rounded-md p-2" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-gray-500 text-sm" >Password:</label>
        <input type="password" className="border border-gray-300 rounded-md p-2" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button disabled={isLoading} type="submit" className="border border-blue-600 py-2 px-7 w-40 text-blue-600 rounded-xl mx-auto">Log In</button>
      {error && <div className='bg-red-100 p-3 border-red-500 border rounded-xl'>{error}</div>}
    </form>

  )
}

export default Signup