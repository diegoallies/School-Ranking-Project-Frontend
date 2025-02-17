import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Report = () => {
  const [reportData, setReportData] = useState(null);
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('questionnaireAnswers')) || {};
    setReportData(storedData);
  }, []);

  const calculateCategoryAverages = () => {
    if (!reportData) return {};

    const categoryScores = {};
    Object.entries(reportData).forEach(([category, answers]) => {
      const scores = Object.values(answers);
      const totalScore = scores.reduce((acc, score) => acc + score, 0);
      const avgScore = totalScore / scores.length;
      categoryScores[category] = avgScore;
    });
    return categoryScores;
  };

  const categoryAverages = calculateCategoryAverages();
  const strengths = Object.entries(categoryAverages).filter(([_, avg]) => avg >= 4);
  const improvements = Object.entries(categoryAverages).filter(([_, avg]) => avg < 4);

  const chartData = {
    labels: Object.keys(categoryAverages),
    datasets: [
      {
        label: 'Average Score',
        data: Object.values(categoryAverages),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Layout>
      <div className="text-center mt-8 mb-6">
        <h1 className="text-3xl font-bold text-white">School Security Report</h1>
        <p className="mt-4 text-lg text-gray-400">Analysis based on your questionnaire responses</p>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Overall Performance</h2>
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-green-400">Strengths</h2>
          <ul className="list-disc ml-6 text-gray-300">
            {strengths.length > 0 ? (
              strengths.map(([category]) => <li key={category}>{category}</li>)
            ) : (
              <p>No major strengths identified.</p>
            )}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-red-400">Areas for Improvement</h2>
          <ul className="list-disc ml-6 text-gray-300">
            {improvements.length > 0 ? (
              improvements.map(([category]) => <li key={category}>{category}</li>)
            ) : (
              <p>All categories performing well.</p>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Report;