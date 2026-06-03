import ActivityTile from '@/components/ActivityTile';
import { Flame, Clock, BookOpen, GraduationCap, BarChart } from 'lucide-react';

export default function AnalyticsPage() {
  const stats = [
    { label: 'Weekly Learning Hours', value: '18.5 hrs', icon: <Clock className="text-blue-400" size={24} />, change: '+12% from last week' },
    { label: 'Courses Completed', value: '4 courses', icon: <BookOpen className="text-purple-400" size={24} />, change: '2 in progress' },
    { label: 'Learning Streak', value: '12 days', icon: <Flame className="text-orange-400" size={24} />, change: 'Keep it up!' },
    { label: 'Skills Mastered', value: '8 skills', icon: <GraduationCap className="text-pink-400" size={24} />, change: 'Top 5% of learners' },
  ];

  return (
    <div className="p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">Detailed stats on your learning patterns and contributions.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-gray-700 rounded-2xl p-6 transition-colors duration-300">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-xs text-slate-400">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityTile index={0} />
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-white text-lg mb-4">Performance Insights</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                You're most active on <span className="text-green-400 font-semibold">Wednesdays</span> and <span className="text-green-400 font-semibold">Sundays</span>.
                Your learning intensity has increased by <span className="text-blue-400 font-semibold">15%</span> compared to the previous week.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tip: Maintain a consistent daily streak of at least 15 minutes to improve long-term retention by up to 40%!
              </p>
            </div>
            
            <div className="pt-6 border-t border-gray-800 flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
                <BarChart className="text-emerald-400" size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Weekly Target Progress</p>
                <p className="text-sm font-semibold text-white">92% Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
