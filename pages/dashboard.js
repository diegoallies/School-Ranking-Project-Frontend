import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaEye, FaSchool, FaStar } from 'react-icons/fa'; // Using icons for actions

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
        <h1 className="text-4xl font-semibold text-white">Admin Dashboard</h1>

        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-300">Total Schools</h2>
              <p className="text-3xl font-bold text-turquoise">{totalSchools}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-full">
              <FaSchool className="text-turquoise text-3xl" />
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-300">Schools Under Review</h2>
              <p className="text-3xl font-bold text-turquoise">{schoolsUnderReview}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-full">
              <FaEye className="text-turquoise text-3xl" />
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-300">Average Rating</h2>
              <p className="text-3xl font-bold text-turquoise">{averageRating} / 5</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-full">
              <FaStar className="text-turquoise text-3xl" />
            </div>
          </div>
        </div>

        {/* Rating Over Time Section */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-300">School Ratings Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dummyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rating" stroke="#1abc9c" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Schools Table Section */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-300">School Overview</h2>
          <table className="min-w-full mt-4 border-collapse table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500">School Name</th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500">Location</th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500">Rating</th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Dynamic Table Rows */}
              {schools.map((school, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-sm text-gray-300">{school.name}</td>
                  <td className="py-2 px-4 border-b text-sm text-gray-300">{school.location}</td>
                  <td className="py-2 px-4 border-b text-sm text-gray-300">{school.rating}</td>
                  <td className="py-2 px-4 border-b text-sm text-gray-300">
                    <button className="text-turquoise hover:text-teal-400 transition">View</button>
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
