// src/pages/profile.js
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    password: '',
  });

  // Simulating a delay for loading user data (dummy data)
  useEffect(() => {
    setTimeout(() => {
      setUser({
        _id: '12345',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
      });
    }, 1000); // Simulate loading delay
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // For now, just simulate a successful update
    alert('Profile updated successfully');
    setUser(editableUser);
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen text-gray-600">
          <div className="text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">User Profile</h1>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Personal Information</h2>
            <div className="border-t mt-4 pt-4">
              <p className="text-gray-600 text-lg">Name: {user.name}</p>
              <p className="text-gray-600 text-lg">Email: {user.email}</p>
              <p className="text-gray-600 text-lg">Role: {user.role}</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={editableUser.name}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={editableUser.email}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700" htmlFor="role">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={editableUser.role}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={editableUser.password}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                placeholder="Leave blank to keep current password"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
