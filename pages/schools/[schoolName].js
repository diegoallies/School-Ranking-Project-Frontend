// src/pages/schools/[schoolName].js
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

const SchoolDetail = () => {
  const router = useRouter();
  const { schoolName } = router.query;

  // Dummy data based on school name (in a real app, you'd fetch this from an API)
  const schoolData = {
    'green-valley': {
      name: 'Green Valley School',
      location: 'California',
      rating: 4.5,
      description: 'A prestigious school with excellent academic and sports programs.',
      founded: 1990,
      students: 1200,
    },
    'riverdale': {
      name: 'Riverdale School',
      location: 'Texas',
      rating: 4.2,
      description: 'A well-known school focused on community and extracurricular activities.',
      founded: 1985,
      students: 950,
    },
    'sunnydale': {
      name: 'Sunnydale School',
      location: 'Florida',
      rating: 4.4,
      description: 'A school known for its innovation and cutting-edge technology programs.',
      founded: 2000,
      students: 1100,
    },
  };

  const school = schoolData[schoolName] || {};

  if (!school.name) {
    return <p>School not found!</p>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800">{school.name}</h1>
        <p className="text-lg text-gray-600">{school.location}</p>
        <p className="text-xl text-gray-700 mt-2">Rating: {school.rating}/5</p>
        
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">About the School</h2>
          <p className="text-gray-600 mt-2">{school.description}</p>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Founded</h3>
            <p className="text-gray-600">{school.founded}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Number of Students</h3>
            <p className="text-gray-600">{school.students}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchoolDetail;
