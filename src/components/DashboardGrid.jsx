import React, { useMemo } from 'react';
import { Flame, Trophy } from 'lucide-react';

const DashboardGrid = ({ roadmap }) => {
  const stats = useMemo(() => {
    const allIssues = roadmap.flatMap(r => r.issues);
    const total = allIssues.length;
    const completed = allIssues.filter(i => i.state === 'completed').length;
    const inProgress = allIssues.filter(i => i.state === 'in-progress').length;
    
    const byDifficulty = {
      Easy: { total: 0, completed: 0 },
      Medium: { total: 0, completed: 0 },
      Hard: { total: 0, completed: 0 },
    };
    
    allIssues.forEach(i => {
      if (byDifficulty[i.difficulty]) {
        byDifficulty[i.difficulty].total += 1;
        if (i.state === 'completed') byDifficulty[i.difficulty].completed += 1;
      }
    });

    return { total, completed, inProgress, byDifficulty, percent: Math.round((completed / total) * 100) || 0 };
  }, [roadmap]);

  // Generate 84 boxes for the GitHub style heatmap
  const heatmapBoxes = useMemo(() => {
    const boxes = Array.from({ length: 84 }).fill('unstarted');
    // Distribute active states for visual effect based on actual counts
    for(let i = 0; i < stats.completed; i++) boxes[83 - i * 2] = 'completed';
    for(let i = 0; i < stats.inProgress; i++) boxes[83 - (i * 2 + 1)] = 'in-progress';
    return boxes;
  }, [stats]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Profile & Global Mastery */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 lg:col-span-1 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#238636] to-[#1f6feb] rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg">
            DE
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">@DataExplorer</h2>
            <span className="text-xs font-semibold bg-[#1f6feb]/20 text-[#58a6ff] border border-[#1f6feb]/30 px-2 py-1 rounded-full inline-block mt-1">
              Data Scientist (Analytics & ML)
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#8b949e]">Global Mastery</span>
            <span className="font-mono text-[#2ea043]">{stats.percent}%</span>
          </div>
          <div className="w-full bg-[#30363d] rounded-full h-2 overflow-hidden">
            <div className="bg-[#238636] h-2 transition-all duration-500 ease-out" style={{ width: `${stats.percent}%` }}></div>
          </div>
        </div>
        
        <div className="flex gap-4 mt-6 pt-6 border-t border-[#30363d]">
          <div className="flex items-center gap-2 text-[#e3b341]">
            <Flame size={18} className="fill-current" />
            <span className="font-semibold">{stats.completed > 0 ? 3 : 0} Day Streak</span>
          </div>
          <div className="flex items-center gap-2 text-[#8b949e]">
            <Trophy size={18} />
            <span className="font-semibold">{stats.completed} Mastered</span>
          </div>
        </div>
      </div>

      {/* GitHub Heatmap & LeetCode Metrics */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Heatmap */}
        <div>
          <h3 className="text-sm font-semibold text-[#8b949e] mb-4">Contribution Activity</h3>
          <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
            {heatmapBoxes.map((state, i) => (
              <div 
                key={i}
                className={`w-3.5 h-3.5 rounded-[2px] transition-colors duration-300 ${
                  state === 'completed' ? 'bg-[#39d353]' : 
                  state === 'in-progress' ? 'bg-[#d29922]' : 
                  'bg-[#2d333b]'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8b949e] mt-3">
            <span>Less</span>
            <div className="w-3 h-3 rounded-[2px] bg-[#2d333b]"></div>
            <div className="w-3 h-3 rounded-[2px] bg-[#d29922]"></div>
            <div className="w-3 h-3 rounded-[2px] bg-[#39d353]"></div>
            <span>More</span>
          </div>
        </div>

        {/* LeetCode Difficulty Bars */}
        <div className="flex flex-col justify-center space-y-4">
          <h3 className="text-sm font-semibold text-[#8b949e] mb-2">Skill Breakdown</h3>
          
          {['Easy', 'Medium', 'Hard'].map((diff) => {
            const data = stats.byDifficulty[diff];
            const pct = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
            const colors = {
              Easy: 'text-[#39d353] bg-[#39d353]',
              Medium: 'text-[#d29922] bg-[#d29922]',
              Hard: 'text-[#f85149] bg-[#f85149]'
            };
            
            return (
              <div key={diff} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className={`${colors[diff].split(' ')[0]} font-medium`}>{diff}</span>
                  <span className="text-[#8b949e]">{data.completed} / {data.total}</span>
                </div>
                <div className="w-full bg-[#30363d] rounded-full h-1.5 overflow-hidden">
                  <div className={`${colors[diff].split(' ')[1]} h-full transition-all duration-500`} style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
};

export default DashboardGrid;
