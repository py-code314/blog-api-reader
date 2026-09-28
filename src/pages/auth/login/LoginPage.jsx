/* -------------------- Hooks -------------------- */
import { useState } from 'react'
import { useLocation } from 'react-router'

/* Login page */
const LoginPage = () => {
  // Get state from signup form using location object
  const location = useLocation()

  // State
  const [flashMsg] = useState(location.state?.message || '')

  return (
    <main>
      <h2>Login</h2>
      {flashMsg && <p>{flashMsg}</p>}
    </main>
  )
}

export default LoginPage
