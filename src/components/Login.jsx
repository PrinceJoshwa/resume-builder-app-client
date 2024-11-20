
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://resume-builder-app-server.vercel.app';

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Debugging: Log the environment variable
  console.log('API URL:', API_URL);
  console.log('Google Client ID:', import.meta.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

  // Google Login
  const loginWithGoogle = useGoogleLogin({
    clientId: import.meta.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, // Explicitly pass clientId
    onSuccess: async (tokenResponse) => {
      console.log('Google Token Response:', tokenResponse); // Debugging
      try {
        setLoading(true);
        const res = await axios.post(
          `${API_URL}/api/auth/google`,
          { token: tokenResponse.access_token }, // Using access token from Google
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        const { token, user } = res.data;
        localStorage.setItem('token', token); // Save JWT to localStorage
        setUser(user); // Update app state with user data
        navigate('/templates'); // Redirect to dashboard
      } catch (err) {
        console.error('Google OAuth error:', err.response?.data || err.message);
        setError('Authentication failed. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    onError: (err) => {
      console.error('Google Sign-In error:', err.message);
      setError('Google Sign-In failed. Please try again.');
    },
    flow: 'implicit', // Match the flow configured in Google Cloud Console
  });

  // Email and Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const { token, user } = res.data;
      localStorage.setItem('token', token); // Save JWT to localStorage
      setUser(user); // Update app state with user data
      navigate('/templates'); // Redirect to dashboard
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
          <button
            type="button"
            onClick={loginWithGoogle}
            disabled={loading}
            className={`w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Loading...' : 'Login with Google'}
          </button>
        </form>
        <p className="text-center text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}