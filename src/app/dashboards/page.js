'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/utils/supabase';
import toast, { Toaster } from 'react-hot-toast';
import { fetchApiKeys, createApiKey, updateApiKey, deleteApiKey } from './api/apiService';
import PlanOverview from './components/PlanOverview';
import ApiKeyList from './components/ApiKeyList';
import ApiKeyModal from './components/ApiKeyModal';

export default function DashboardPage() {
  const [apiKeys, setApiKeys] = useState([]);
  const [visibleKeys, setVisibleKeys] = useState({});
  const [credits, setCredits] = useState(0);
  const [maxCredits, setMaxCredits] = useState(1000);
  const [payAsYouGo, setPayAsYouGo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    loadApiKeys();
    setupRealtimeSubscription();
  }, []);

  const loadApiKeys = async () => {
    try {
      const data = await fetchApiKeys();
      setApiKeys(data || []);
    } catch (error) {
      console.error('Error loading API keys:', error);
      toast.error('Failed to load API keys');
    }
  };

  const setupRealtimeSubscription = () => {
    const subscription = supabase
      .channel('api_keys_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'api_keys' 
        }, 
        () => loadApiKeys()
      )
      .subscribe();

    return () => subscription.unsubscribe();
  };

  const handleSaveKey = async (keyData) => {
    try {
      if (editingKey) {
        await updateApiKey(editingKey, keyData);
        toast.success('API key updated successfully');
      } else {
        await createApiKey(keyData);
        toast.success('New API key created successfully');
      }
      await loadApiKeys();
      setShowModal(false);
      setEditingKey(null);
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error('Failed to save API key');
    }
  };

  const handleDeleteKey = async (id) => {
    try {
      await deleteApiKey(id);
      toast.success('API key deleted successfully', {
        style: {
          background: '#ef4444',
          color: '#fff',
        },
        icon: '🗑️',
      });
      await loadApiKeys();
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast.error('Failed to delete API key');
    }
  };

  const handleCopyKey = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success('Copied API Key to clipboard');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
      toast.error('Failed to copy API key');
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-center" />
      
      <PlanOverview
        credits={credits}
        maxCredits={maxCredits}
        payAsYouGo={payAsYouGo}
        setPayAsYouGo={setPayAsYouGo}
      />

      <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">API Keys</h2>
          <button
            onClick={() => setShowModal(true)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Image src="/plus.svg" alt="Add" width={24} height={24} className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          The key is used to authenticate your requests to the Research API. 
          To learn more, see the <a href="#" className="underline">documentation</a> page.
        </p>

        <ApiKeyList
          apiKeys={apiKeys}
          visibleKeys={visibleKeys}
          toggleKeyVisibility={(id) => setVisibleKeys(prev => ({ ...prev, [id]: !prev[id] }))}
          onCopy={handleCopyKey}
          onEdit={(key) => {
            setEditingKey(key.id);
            setShowModal(true);
          }}
          onDelete={handleDeleteKey}
          copiedId={copiedId}
        />
      </div>

      {showModal && (
        <ApiKeyModal
          showModal={showModal}
          setShowModal={setShowModal}
          editingKey={editingKey}
          setEditingKey={setEditingKey}
          onSave={handleSaveKey}
          initialData={editingKey ? apiKeys.find(k => k.id === editingKey) : {}}
        />
      )}
    </div>
  );
} 