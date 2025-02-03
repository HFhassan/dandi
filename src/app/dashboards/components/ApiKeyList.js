'use client';
import Image from 'next/image';

export default function ApiKeyList({ 
  apiKeys, 
  visibleKeys, 
  toggleKeyVisibility, 
  onCopy, 
  onEdit, 
  onDelete,
  copiedId 
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[2fr_1fr_3fr_1fr] gap-4 px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
        <div>NAME</div>
        <div>USAGE</div>
        <div>KEY</div>
        <div>OPTIONS</div>
      </div>

      {apiKeys.map((apiKey) => (
        <div
          key={apiKey.id}
          className="grid grid-cols-[2fr_1fr_3fr_1fr] gap-4 items-center px-4 py-3 border-t border-gray-100 dark:border-gray-700"
        >
          <div>{apiKey.name}</div>
          <div>{apiKey.usage}</div>
          <div className="font-mono text-sm">
            {visibleKeys[apiKey.id] ? apiKey.key : apiKey.key.replace(/[^-]/g, '*')}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toggleKeyVisibility(apiKey.id)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Image 
                src={visibleKeys[apiKey.id] ? "/eye-off.svg" : "/eye.svg"}
                alt="Toggle visibility"
                width={16}
                height={16}
                className="text-gray-600 dark:text-gray-300"
              />
            </button>
            <button
              onClick={() => onCopy(apiKey.key, apiKey.id)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            >
              <Image 
                src={copiedId === apiKey.id ? "/check.svg" : "/copy.svg"}
                alt="Copy"
                width={16}
                height={16}
                className="text-gray-600 dark:text-gray-300"
              />
            </button>
            <button
              onClick={() => onEdit(apiKey)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Image 
                src="/edit.svg" 
                alt="Edit" 
                width={16} 
                height={16}
                className="text-gray-600 dark:text-gray-300"
              />
            </button>
            <button
              onClick={() => onDelete(apiKey.id)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Image 
                src="/trash.svg" 
                alt="Delete" 
                width={16} 
                height={16}
                className="text-gray-600 dark:text-gray-300"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 