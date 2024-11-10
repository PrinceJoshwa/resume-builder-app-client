// import { useGoogleLogin } from '@react-oauth/google'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { useState } from 'react'

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


// export default function Login({ setUser }) {
//   const navigate = useNavigate()
//   const [error, setError] = useState(null)

//   const login = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         const res = await axios.post(`${API_URL}/api/auth/google`, {
//           token: tokenResponse.access_token,
//         }, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         })
//         const userData = res.data.user
//         setUser(userData)
//         localStorage.setItem('user', JSON.stringify(userData))
//         navigate('/dashboard')
//       } catch (err) {
//         console.error('Authentication error:', err.response ? err.response.data : err.message)
//         setError('Failed to authenticate. Please try again.')
//       }
//     },
//     onError: (error) => {
//       console.error('Google Sign-In error:', error)
//       setError('Google Sign-In failed. Please try again.')
//     },
//   });
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Implement regular email/password login here
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
//         <h2 className="text-3xl font-bold text-center">Login</h2>
        
//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="m@example.com"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <div className="flex items-center justify-between">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
//                 Forgot your password?
//               </a>
//             </div>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           {error && (
//             <p className="text-red-500 text-sm">{error}</p>
//           )}

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800"
//           >
//             Login
//           </button>

//           <button
//             type="button"
//             onClick={() => login()}
//             className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
//           >
//             Login with Google
//           </button>
//         </form>

//         <p className="text-center text-sm">
//           {"Don't have an account? "}
//           <a href="/signup" className="text-blue-600 hover:text-blue-500">
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }









import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(''); // Added email state
  const [password, setPassword] = useState(''); // Added password state

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(
          `${API_URL}/api/auth/google`,
          { token: tokenResponse.access_token },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const userData = res.data.user;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/dashboard');
      } catch (err) {
        console.error(
          'Authentication error:',
          err.response ? err.response.data : err.message
        );
        setError('Failed to authenticate. Please try again.');
      }
    },
    onError: (error) => {
      console.error('Google Sign-In error:', error);
      setError('Google Sign-In failed. Please try again.');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement regular email/password login here
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const userData = res.data.user;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => login()}
            className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Login with Google
          </button>
        </form>

        <p className="text-center text-sm">
          {"Don't have an account? "}
          <a href="/signup" className="text-blue-600 hover:text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
