// import { Routes, Route, Navigate } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import Login from './components/Login'
// // import Dashboard from './components/Dashboard'
// import Templates from './pages/Templates'

// function App() {
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user')
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }
//   }, [])

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
//             <Templates user={user} setUser={setUser} />
//           </ProtectedRoute>
//         }
//       />
//       <Route path="/" element={user ? <Navigate to="/templates" replace /> : <Navigate to="/login" replace />} />
//     </Routes>
//   )
// }

// export default App




// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/Login'
import Templates from './pages/Templates'
import Template1 from './pages/Template1'
// Import other template pages if available

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  return (
    <Routes>
      {/* Login route */}
      <Route path="/login" element={<Login setUser={setUser} />} />
      
      {/* Main templates route */}
      <Route
        path="/templates"
        element={
          <ProtectedRoute>
            <Templates user={user} setUser={setUser} />
          </ProtectedRoute>
        }
      />

      {/* Individual template routes */}
      <Route
        path="/template1"
        element={
          <ProtectedRoute>
            <Template1 />
          </ProtectedRoute>
        }
      />
      {/* Add additional template routes as needed */}
      {/* <Route path="/template2" element={<ProtectedRoute><Template2 /></ProtectedRoute>} /> */}

      {/* Redirect to templates or login based on user state */}
      <Route path="/" element={user ? <Navigate to="/templates" replace /> : <Navigate to="/login" replace />} />

      {/* Catch-all route for 404 page */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  )
}

export default App
