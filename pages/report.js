// src/pages/report.js
import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Layout from '../components/Layout'; // Make sure to import your Layout

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Report = () => {
  const [responses, setResponses] = useState({});
  const [categories, setCategories] = useState([]);
  const [analysis, setAnalysis] = useState([]);

  const ratingWeight = {
    'Meeting Standard': 5,
    'Compliant with Essential Requirements': 4,
    'Moderate Compliant': 3,
    'Borderline Compliant': 2,
    'Diminutive Compliant': 1,
    'Not Applicable': 0,
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedResponses = JSON.parse(localStorage.getItem('questionnaireAnswers')) || {};
      setResponses(savedResponses);
    }
  }, []);

  useEffect(() => {
    if (responses && Object.keys(responses).length > 0) {
      const categoryAnalysis = Object.keys(responses).map((category) => {
        const questions = responses[category];
        const totalRating = Object.values(questions).reduce(
          (acc, value) => acc + ratingWeight[value],
          0
        );
        const averageRating = totalRating / Object.keys(questions).length;

        return {
          category,
          totalRating,
          averageRating,
          strength:
            averageRating >= 4
              ? 'Strong'
              : averageRating >= 3
              ? 'Average'
              : 'Weak',
        };
      });

      setCategories(Object.keys(responses));
      setAnalysis(categoryAnalysis);
    }
  }, [responses]);

  const sortedAnalysis = analysis.sort((a, b) => b.averageRating - a.averageRating);

  const barChartData = {
    labels: sortedAnalysis.map(item => item.category),
    datasets: [
      {
        label: 'Total Rating',
        data: sortedAnalysis.map(item => item.totalRating),
        backgroundColor: '#38bdf8', // Blue color
        borderColor: '#0ea5e9', // Slightly darker blue
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Strong', 'Average', 'Weak'],
    datasets: [
      {
        data: [
          sortedAnalysis.filter(item => item.strength === 'Strong').length,
          sortedAnalysis.filter(item => item.strength === 'Average').length,
          sortedAnalysis.filter(item => item.strength === 'Weak').length,
        ],
        backgroundColor: ['#10b981', '#fbbf24', '#ef4444'], // Green, Yellow, Red
      },
    ],
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center text-turquoise-500 mb-6">Questionnaire Analysis Report</h1>
        <p className="mb-8 text-lg text-gray-400 text-center">
          This report analyzes your responses and highlights areas of strength and improvement.
        </p>

        {/* Category Analysis Table */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-turquoise-500">Category Analysis</h2>
          <table className="min-w-full bg-gray-800 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 border-b">Category</th>
                <th className="text-left py-2 px-4 border-b">Total Rating</th>
                <th className="text-left py-2 px-4 border-b">Average Rating</th>
                <th className="text-left py-2 px-4 border-b">Strength</th>
              </tr>
            </thead>
            <tbody>
              {sortedAnalysis.map((item) => (
                <tr key={item.category} className="hover:bg-gray-700">
                  <td className="py-3 px-4 border-b">{item.category}</td>
                  <td className="py-3 px-4 border-b">{item.totalRating}</td>
                  <td className="py-3 px-4 border-b">{item.averageRating.toFixed(2)}</td>
                  <td className="py-3 px-4 border-b">
                    <span
                      className={`px-3 py-1 rounded-full ${item.strength === 'Strong' ? 'bg-green-500' : item.strength === 'Average' ? 'bg-yellow-500' : 'bg-red-500'} text-white`}
                    >
                      {item.strength}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-gray-300 mb-4">Category Ratings (Bar Chart)</h3>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-gray-300 mb-4">Strength Distribution (Pie Chart)</h3>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>

        {/* Insights */}
        <div className="space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-300">Strong Areas</h3>
            <ul className="mt-2 text-gray-400">
              {sortedAnalysis
                .filter((item) => item.strength === 'Strong')
                .map((item) => (
                  <li key={item.category} className="mb-2">{item.category}</li>
                ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-300">Areas for Improvement</h3>
            <ul className="mt-2 text-gray-400">
              {sortedAnalysis
                .filter((item) => item.strength === 'Weak')
                .map((item) => (
                  <li key={item.category} className="mb-2">{item.category}</li>
                ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-300">Average Rating</h3>
            <p className="mt-2 text-gray-400">Your overall average rating across all categories is: </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {(
                sortedAnalysis.reduce((acc, item) => acc + item.averageRating, 0) /
                sortedAnalysis.length
              ).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Report;
