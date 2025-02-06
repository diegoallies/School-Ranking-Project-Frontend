import { useRouter } from 'next/router';
import useAuthStore from '../store/authStore';

const Home = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to School Rating Platform</h1>
      <p className="mt-2 text-lg">Rate and review schools based on various factors.</p>

      {user ? (
        <button onClick={() => router.push('/dashboard')} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
          Go to Dashboard
        </button>
      ) : (
        <button onClick={() => router.push('/login')} className="mt-4 px-6 py-2 bg-green-500 text-white rounded">
          Login
        </button>
      )}
    </div>
  );
};

export default Home;
