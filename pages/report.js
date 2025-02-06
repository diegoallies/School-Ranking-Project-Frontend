import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

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

  // Rating scale for analysis
  const ratingWeight = {
    'Meeting Standard': 5,
    'Compliant with Essential Requirements': 4,
    'Moderate Compliant': 3,
    'Borderline Compliant': 2,
    'Diminutive Compliant': 1,
    'Not Applicable': 0,
  };

  // Load data from localStorage only on the client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedResponses = JSON.parse(localStorage.getItem('questionnaireAnswers')) || {};
      setResponses(savedResponses);
    }
  }, []);

  // Analysis of the categories
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

  // Sorting the analysis by strength
  const sortedAnalysis = analysis.sort((a, b) => b.averageRating - a.averageRating);

  // Chart Data Preparation
  const barChartData = {
    labels: sortedAnalysis.map(item => item.category),
    datasets: [
      {
        label: 'Total Rating',
        data: sortedAnalysis.map(item => item.totalRating),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-gray-900 text-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-turquoise-500 mb-6">
        Questionnaire Analysis Report
      </h1>

      <p className="mb-8 text-lg text-gray-400 text-center">
        This report analyzes your responses and highlights areas of strength and improvement.
      </p>

      <div className="space-y-6">
        {/* Bar Chart - Total Ratings per Category */}
        <h2 className="text-2xl font-semibold text-turquoise-500">Category Analysis</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        {/* Pie Chart - Strength Distribution */}
        <h2 className="text-2xl font-semibold text-turquoise-500 mt-8">Strength Distribution</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        {/* Insights Section */}
        <h2 className="text-2xl font-semibold text-turquoise-500 mt-8">Insights</h2>
        <div className="space-y-4">
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
    </div>
  );
};

export default Report;
