import { useState } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '../store/authStore';

const Auth = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('guest');
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister
      ? '/api/auth/register' // Use the proxy URL for development
      : '/api/auth/login';

    const body = isRegister
      ? JSON.stringify({ name, email, password, role })
      : JSON.stringify({ email, password });

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    if (res.ok) {
      const data = await res.json();
      if (!isRegister) {
        login(data.user, data.token); // Store user and token in Zustand
        router.push('/dashboard');
      } else {
        alert('Registration successful! Please log in.');
        setIsRegister(false);
      }
    } else {
      alert('Error: Invalid credentials or registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
      <div className="p-10 shadow-2xl rounded-lg bg-gray-850 w-96 text-center border border-gray-700">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-500">
          {isRegister ? 'Create an Account' : 'Welcome Back'}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          {isRegister && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input"
              required
            >
              <option value="admin">Admin</option>
              <option value="guest">User</option>
              <option value="serviceProv">Installer Service Provider</option>
              <option value="schoolRep">School Representative</option>
            </select>
          )}
          <button
            type="submit"
            className="btn-primary text-lg py-3 rounded-lg shadow-lg"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="mt-6 text-blue-400 hover:underline transition"
        >
          {isRegister ? 'Already have an account? Login' : 'New here? Register'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
