// src/pages/dashboard.js
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dummy Data
const dummyData = [
  { name: 'Jan', rating: 4.2 },
  { name: 'Feb', rating: 4.3 },
  { name: 'Mar', rating: 4.1 },
  { name: 'Apr', rating: 4.5 },
  { name: 'May', rating: 4.6 },
  { name: 'Jun', rating: 4.4 },
  { name: 'Jul', rating: 4.7 },
  { name: 'Aug', rating: 4.3 },
  { name: 'Sep', rating: 4.2 },
];

const Dashboard = () => {
  // State for total schools, schools under review, and average rating
  const [totalSchools, setTotalSchools] = useState(120);
  const [schoolsUnderReview, setSchoolsUnderReview] = useState(8);
  const [averageRating, setAverageRating] = useState(4.3);

  // Dummy data for the school table
  const [schools, setSchools] = useState([
    { name: 'School 1', location: 'City 1', rating: 4.2 },
    { name: 'School 2', location: 'City 2', rating: 4.3 },
    { name: 'School 3', location: 'City 3', rating: 4.1 },
    { name: 'School 4', location: 'City 4', rating: 4.5 },
  ]);

  // Fetch schools data (mocked here for now)
  useEffect(() => {
    // Fetching logic could go here, e.g., API call to get real data
    setTotalSchools(120); // Set this from the backend API
    setSchoolsUnderReview(8); // Set this from the backend API
    setAverageRating(4.3); // Set this from the backend API
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
        
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Total Schools</h2>
            <p className="text-3xl font-bold text-gray-800">{totalSchools}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Schools Under Review</h2>
            <p className="text-3xl font-bold text-gray-800">{schoolsUnderReview}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Average Rating</h2>
            <p className="text-3xl font-bold text-gray-800">{averageRating} / 5</p>
          </div>
        </div>

        {/* Rating Over Time Section */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">School Ratings Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dummyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rating" stroke="#4CAF50" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Schools Table Section */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">School Overview</h2>
          <table className="min-w-full mt-4 border-collapse table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">School Name</th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">Location</th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">Rating</th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Dynamic Table Rows */}
              {schools.map((school, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-sm text-gray-700">{school.name}</td>
                  <td className="py-2 px-4 border-b text-sm text-gray-700">{school.location}</td>
                  <td className="py-2 px-4 border-b text-sm text-gray-700">{school.rating}</td>
                  <td className="py-2 px-4 border-b text-sm text-gray-700">
                    <button className="text-blue-500 hover:text-blue-700">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
