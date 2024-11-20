// import { Routes, Route, Navigate } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import Login from './components/Login'
// import Templates from './pages/Templates'
// import Template1 from './pages/Template1'

// function App() {
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user')
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }
//   }, [])

//   const handleLogout = () => {
//     localStorage.removeItem('user')
//     localStorage.removeItem('token')
//     setUser(null)
//   }

//   const ProtectedRoute = ({ children }) => {
//     if (!user) {
//       return <Navigate to="/login" replace />
//     }
//     return children
//   }

//   return (
//     <Routes>
//       <Route path="/login" element={<Login setUser={setUser} />} />
      
//       <Route
//         path="/templates"
//         element={
//           <ProtectedRoute>
//             <Templates user={user} onLogout={handleLogout} />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/template1"
//         element={
//           <ProtectedRoute>
//             <Template1 user={user} onLogout={handleLogout} />
//           </ProtectedRoute>
//         }
//       />

//       <Route path="/" element={user ? <Navigate to="/templates" replace /> : <Navigate to="/login" replace />} />

//       <Route path="*" element={<div>Page Not Found</div>} />
//     </Routes>
//   )
// }

// export default App

import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/Login'
import Templates from './pages/Templates'
import Template1 from './pages/Template1'

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
  }

  const ProtectedRoute = ({ children }) => {
    if (!user || !token) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} setToken={setToken} />} />
      
      <Route
        path="/templates"
        element={
          <ProtectedRoute>
            <Templates user={user} token={token} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/template1"
        element={
          <ProtectedRoute>
            <Template1 user={user} token={token} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={user && token ? <Navigate to="/templates" replace /> : <Navigate to="/login" replace />} />

      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  )
}

export default App