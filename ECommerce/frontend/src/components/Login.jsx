import React, { useState } from 'react'
import { login, setToken } from '../api'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    try {
      const data = await login(email, password)
      const token = data.access
      setToken(token)
      onLogin(token)
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <div>
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
