'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedPlayground() {
  const router = useRouter();

  useEffect(() => {
    // Check if API key exists in session storage
    const apiKey = sessionStorage.getItem('apiKey');
    if (!apiKey) {
      router.push('/dashboards/playground');
    }
  }, [router]);

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6">API Playground</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to the protected playground! You can now test the API endpoints.
        </p>
        {/* Add your playground content here */}
      </div>
    </div>
  );
} 