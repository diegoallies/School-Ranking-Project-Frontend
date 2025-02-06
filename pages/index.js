import { useRouter } from 'next/router';
import useAuthStore from '../store/authStore';

const Home = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      {/* Header Section */}
      <div className="text-center mt-20 px-4 md:px-10">
        <h1 className="text-5xl font-extrabold leading-tight">
          Welcome to <span className="text-turquoise-500">SchoolRank</span>
        </h1>
        <p className="mt-4 text-xl md:text-2xl font-medium">
          Rate and review schools based on various factors, and help improve education for everyone!
        </p>
      </div>

      {/* Info Section */}
      <div className="flex flex-col items-center justify-center mt-12 px-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg text-center">
          <h2 className="text-3xl font-semibold text-turquoise-400">How It Works</h2>
          <p className="mt-4 text-lg text-gray-300">
            You can rate schools based on their performance, infrastructure, and teacher quality. See other users' reviews and get a complete insight into schools.
          </p>
        </div>

        {/* Button to Proceed */}
        <div className="mt-8">
          {!user ? (
            <button
              onClick={() => router.push('/login')}
              className="px-8 py-3 bg-turquoise-500 text-gray-800 font-semibold text-xl rounded-lg hover:bg-turquoise-600 transition-all"
            >
              Start by Logging In
            </button>
          ) : (
            <button
              onClick={() => router.push('/dashboard')}
              className="px-8 py-3 bg-turquoise-500 text-white font-semibold text-xl rounded-lg hover:bg-turquoise-600 transition-all"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-5 text-gray-400">
        <p>© 2025 SchoolRank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
