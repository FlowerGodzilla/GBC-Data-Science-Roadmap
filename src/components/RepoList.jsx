import React from 'react';
import IssueRow from './IssueRow';
import { GitBranch } from 'lucide-react';

const RepoList = ({ roadmap, toggleIssueState }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {roadmap.map((repo) => {
        const repoCompleted = repo.issues.filter(i => i.state === 'completed').length;
        const total = repo.issues.length;
        const isFinished = repoCompleted === total;

        return (
          <div key={repo.id} className={`border rounded-lg transition-all ${isFinished ? 'border-[#2ea043] bg-[#161b22]/50' : 'border-[#30363d] bg-[#161b22]'}`}>
            {/* Repo Header */}
            <div className="p-4 border-b border-[#30363d] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-[#58a6ff] flex items-center gap-2 hover:underline cursor-pointer">
                  <GitBranch size={18} className="text-[#8b949e]"/>
                  {repo.name}
                </h3>
                <p className="text-sm text-[#8b949e] mt-1">{repo.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  repo.difficulty === 'Easy' ? 'border-[#39d353] text-[#39d353]' :
                  repo.difficulty === 'Medium' ? 'border-[#d29922] text-[#d29922]' :
                  'border-[#f85149] text-[#f85149]'
                }`}>
                  {repo.difficulty} Phase
                </span>
                <span className="text-sm font-mono text-[#8b949e]">
                  {repoCompleted} / {total}
                </span>
              </div>
            </div>
            
            {/* Issues List */}
            <div className="divide-y divide-[#30363d]">
              {repo.issues.map((issue) => (
                <IssueRow 
                  key={issue.id} 
                  issue={issue} 
                  onToggle={() => toggleIssueState(repo.id, issue.id)} 
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RepoList;
