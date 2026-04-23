import React, { useState } from 'react'

const CardCreate = ({ onClose, onCreateUser }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(name.trim() === '' || email.trim() === '') {
      alert("Please fill in all fields")
      return
    }

    try {
      await onCreateUser({ nombre: name.trim(), 
        email: email.trim() })

      setName('')
      setEmail('')
      onClose()
    } catch (error) {
      alert("Error creating user")
      console.error(error)
    }
  }




  return (
    <div className='w-60 h-50 border z-9 bg-white p-2 rounded-2xl '  >

      <div className='w-full flex justify-end'>
        <button onClick={onClose}className=''>X</button>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          placeholder='name' 
          className='border border-gray-400 p-1 rounded-lg mb-1' 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <label htmlFor="email">Email:</label>
        <input 
          type="text" 
          id="email" 
          placeholder='email' 
          className='border border-gray-400 p-1 rounded-lg mb-1' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button className='border border-green-400 py-1 px-3 rounded-xl'>Create</button>
      </form>
      
    </div>
  )
}

export default CardCreate
