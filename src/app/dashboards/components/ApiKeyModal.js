'use client';
import { useState } from 'react';

export default function ApiKeyModal({ 
  showModal, 
  setShowModal, 
  editingKey, 
  setEditingKey, 
  onSave, 
  initialData = {} 
}) {
  const [keyName, setKeyName] = useState(initialData.name || '');
  const [monthlyLimit, setMonthlyLimit] = useState(initialData.limit || 1000);
  const [limitEnabled, setLimitEnabled] = useState(!!initialData.limit);

  const handleSave = async () => {
    await onSave({
      name: keyName,
      monthlyLimit: limitEnabled ? monthlyLimit : null,
    });
    resetForm();
  };

  const resetForm = () => {
    setKeyName('');
    setMonthlyLimit(1000);
    setLimitEnabled(false);
    setShowModal(false);
    setEditingKey(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">
          {editingKey ? 'Edit API key' : 'Create a new API key'}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {editingKey ? 'Edit name and limit for this API key.' : 'Enter a name and limit for the new API key.'}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Key Name — A unique name to identify this key
            </label>
            <input
              type="text"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="Key Name"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={limitEnabled}
                onChange={(e) => setLimitEnabled(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm font-medium">Limit monthly usage*</span>
            </label>
            {limitEnabled && (
              <input
                type="number"
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <p className="text-xs text-gray-500 mt-2">
              *If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={resetForm}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!keyName.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editingKey ? 'Save' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
} 