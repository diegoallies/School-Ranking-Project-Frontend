import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '../store/authStore'; 
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (!user && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [user, router]);

  return <Component {...pageProps} />;
}

export default MyApp;
