'use client';

import { useState } from 'react';
import { Sliders, RefreshCw } from 'lucide-react';

export default function SettingsPage() {
  const [username, setUsername] = useState('Alex');
  const [streakDays, setStreakDays] = useState(12);
  const [targetHours, setTargetHours] = useState(20);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Configure your profile and learning preferences.</p>
        </div>

        <form onSubmit={handleSave} className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2 border-b border-gray-800 pb-4">
            <Sliders size={20} className="text-blue-400" />
            <span>General Preferences</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 outline-none transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Target Weekly Hours</label>
                <input
                  type="number"
                  value={targetHours}
                  onChange={(e) => setTargetHours(Number(e.target.value))}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Mock Streak Count</label>
                <input
                  type="number"
                  value={streakDays}
                  onChange={(e) => setStreakDays(Number(e.target.value))}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Theme Enforced</label>
              <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800 text-xs text-blue-400/80">
                Next-Gen Futuristic Dark Mode is enforced for hardware-accelerated layouts.
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <div className="text-xs text-gray-400 h-4">
              {isSaved && <span className="text-green-400 font-semibold">Settings saved successfully!</span>}
            </div>
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              {isUpdating && <RefreshCw size={16} className="animate-spin" />}
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
