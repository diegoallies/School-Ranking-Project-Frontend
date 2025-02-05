// src/pages/schools.js
import Layout from '../components/Layout';
import Link from 'next/link';

const Schools = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-800">Schools</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-800">Green Valley School</h2>
          <p className="text-gray-600">Location: California</p>
          <p className="text-gray-600">Rating: 4.5/5</p>
          <Link href="/schools/green-valley" className="text-blue-600 mt-4 block hover:underline">
            View Details
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-800">Riverdale School</h2>
          <p className="text-gray-600">Location: Texas</p>
          <p className="text-gray-600">Rating: 4.2/5</p>
          <Link href="/schools/riverdale" className="text-blue-600 mt-4 block hover:underline">
            View Details
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-800">Sunnydale School</h2>
          <p className="text-gray-600">Location: Florida</p>
          <p className="text-gray-600">Rating: 4.4/5</p>
          <Link href="/schools/sunnydale" className="text-blue-600 mt-4 block hover:underline">
            View Details
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Schools;
