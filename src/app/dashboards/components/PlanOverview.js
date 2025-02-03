'use client';
import Image from 'next/image';

export default function PlanOverview({ 
  credits, 
  maxCredits, 
  payAsYouGo, 
  setPayAsYouGo 
}) {
  return (
    <div className="mb-12 p-8 rounded-xl bg-gradient-to-r from-rose-100/90 via-purple-100/90 to-blue-100/90 dark:from-rose-800/20 dark:via-purple-800/20 dark:to-blue-800/20">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="px-4 py-1 bg-white/30 dark:bg-white/10 rounded-full text-sm">CURRENT PLAN</span>
          <h1 className="text-4xl font-bold mt-4">Researcher</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/30 dark:bg-white/10 rounded-lg hover:bg-white/40 dark:hover:bg-white/20">
          <Image src="/gear.svg" alt="Settings" width={20} height={20} className="text-gray-700 dark:text-gray-200" />
          Manage Plan
        </button>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl">API Usage</h2>
          <Image src="/info.svg" alt="Info" width={16} height={16} />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${(credits / maxCredits) * 100}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm">{credits.toLocaleString()} / {maxCredits.toLocaleString()} Credits</p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={payAsYouGo}
            onChange={() => setPayAsYouGo(!payAsYouGo)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <span className="text-sm">Pay as you go</span>
        <Image src="/info.svg" alt="Info" width={16} height={16} />
      </div>
    </div>
  );
} 