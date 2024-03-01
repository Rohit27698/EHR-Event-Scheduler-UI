import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';

const Login = () => {
  const{setUser,setIsLogged}=useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('https://easy-gray-seahorse-shoe.cyclic.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          alert(data.message);
          localStorage.setItem('token',(data.token))
          localStorage.setItem('user',(data.user.name))
          localStorage.setItem('userData',(data.user._id))
          localStorage.setItem('isLogin',(true))
          setUser(data.user.name)
          setIsLogged(true)
          navigate('/')
        } else {
          setError('Invalid email or password');
        }
      } else {
        setError('Error during login. Please try again.');
      }
    } catch (error) {
      setError('Error during login. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-900">
      <div className="max-w-md bg-neutral-200 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl text-center mb-8 text-purple-900">
          Sign in to your Account
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded border focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded border focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-700">Remember me</span>
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="pt-6 text-center">
          <p className="text-gray-700">
            New User?{' '}
            <Link className="text-blue-400" to={'/signup'}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
