'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { validateApiKey } from '../api/apiService';

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isValid = await validateApiKey(apiKey);
      
      if (isValid) {
        toast.success('API key is valid!', {
          style: {
            background: '#22c55e',
            color: '#fff',
          },
          duration: 2000,
        });
        // Store the API key in session storage for protected routes
        sessionStorage.setItem('apiKey', apiKey);
        // Redirect to protected playground after 2 seconds
        setTimeout(() => {
          router.push('/dashboards/playground/protected');
        }, 2000);
      } else {
        toast.error('Invalid API key', {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      toast.error('Error validating API key');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <Toaster position="top-center" />
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6">API Playground</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Enter your API key to access the playground. You can find your API keys in the dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              API Key
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="dandi-..."
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !apiKey.trim()}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Access Playground'
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 