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

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      
      <Route
        path="/templates"
        element={
          <ProtectedRoute>
            <Templates user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/template1"
        element={
          <ProtectedRoute>
            <Template1 user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={user ? <Navigate to="/templates" replace /> : <Navigate to="/login" replace />} />

      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  )
}

export default App