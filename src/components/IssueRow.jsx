import React from 'react';
import { CircleDot, CheckCircle2, GitPullRequest } from 'lucide-react';

const IssueRow = ({ issue, onToggle }) => {
  const getStatusIcon = () => {
    switch(issue.state) {
      case 'completed': 
        return <CheckCircle2 size={18} className="text-[#8957e5]" />; // GitHub purple for merged/completed
      case 'in-progress': 
        return <GitPullRequest size={18} className="text-[#39d353]" />; // GitHub green PR open
      default: 
        return <CircleDot size={18} className="text-[#8b949e]" />; // GitHub gray issue open
    }
  };

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'text-[#39d353]';
      case 'Medium': return 'text-[#d29922]';
      case 'Hard': return 'text-[#f85149]';
      default: return 'text-[#8b949e]';
    }
  };

  return (
    <div className="flex items-center p-3 sm:p-4 hover:bg-[#1c2128] transition-colors group">
      <button 
        onClick={onToggle}
        className="p-1 rounded hover:bg-[#30363d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#58a6ff]"
        title="Click to change state"
      >
        {getStatusIcon()}
      </button>
      
      <div className="ml-3 flex-grow">
        <div className="flex items-center gap-2">
          <span className={`font-semibold text-[15px] ${issue.state === 'completed' ? 'text-[#8b949e] line-through' : 'text-[#e6edf3]'}`}>
            {issue.title}
          </span>
          <span className={`text-[11px] px-1.5 py-0.5 rounded border border-[#30363d] ${getDifficultyColor(issue.difficulty)}`}>
            {issue.difficulty}
          </span>
        </div>
        <p className="text-xs text-[#8b949e] mt-0.5">#{issue.id.replace('i', '')} · {issue.description}</p>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block text-[#8b949e]">
        <span className="text-xs mr-2 font-mono uppercase bg-[#21262d] px-2 py-1 rounded">
          {issue.state.replace('-', ' ')}
        </span>
      </div>
    </div>
  );
};

export default IssueRow;
