import { useState } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '../store/authStore';

const Auth = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Default role is "guest" (which represents a regular user)
  const [role, setRole] = useState('guest');
  const [isRegister, setIsRegister] = useState(false);

  // Dummy additional fields for each role:
  const [adminCode, setAdminCode] = useState('ADMIN1234');
  const [companyName, setCompanyName] = useState('Acme Services');
  const [licenseNumber, setLicenseNumber] = useState('SP-0001');
  const [schoolName, setSchoolName] = useState('Springfield High');
  const [schoolDistrict, setSchoolDistrict] = useState('District 9');
  const [phone, setPhone] = useState('555-1234');

  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister ? '/api/auth/register' : '/api/auth/login';

    // Build the payload based on whether it's a registration or login
    let payload = isRegister
      ? { name, email, password, role }
      : { email, password };

    // Include additional fields based on role (for demo purposes)
    if (isRegister) {
      if (role === 'admin') {
        payload.adminCode = adminCode;
      } else if (role === 'serviceProv') {
        payload.companyName = companyName;
        payload.licenseNumber = licenseNumber;
      } else if (role === 'schoolRep') {
        payload.schoolName = schoolName;
        payload.schoolDistrict = schoolDistrict;
      } else if (role === 'guest') {
        payload.phone = phone;
      }
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      if (!isRegister) {
        // For login, store user and token in Zustand and redirect to dashboard
        login(data.user, data.token);
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

          {/* Render additional fields based on selected role */}
          {isRegister && role === 'admin' && (
            <input
              type="text"
              placeholder="Admin Code"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              required
              className="input"
            />
          )}

          {isRegister && role === 'serviceProv' && (
            <>
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="input"
              />
              <input
                type="text"
                placeholder="License Number"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
                className="input"
              />
            </>
          )}

          {isRegister && role === 'schoolRep' && (
            <>
              <input
                type="text"
                placeholder="School Name"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                required
                className="input"
              />
              <input
                type="text"
                placeholder="School District"
                value={schoolDistrict}
                onChange={(e) => setSchoolDistrict(e.target.value)}
                required
                className="input"
              />
            </>
          )}

          {isRegister && role === 'guest' && (
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="input"
            />
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
          {isRegister
            ? 'Already have an account? Login'
            : 'New here? Register'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
