import React, { useState, useEffect } from 'react';
import DashboardGrid from './components/DashboardGrid';
import RepoList from './components/RepoList';
import { initialRoadmap } from './data/roadmapData';

function App() {
  const [roadmap, setRoadmap] = useState(() => {
    const saved = localStorage.getItem('dataScienceRoadmap');
    return saved ? JSON.parse(saved) : initialRoadmap;
  });

  useEffect(() => {
    localStorage.setItem('dataScienceRoadmap', JSON.stringify(roadmap));
  }, [roadmap]);

  const toggleIssueState = (repoId, issueId) => {
    setRoadmap((prevRoadmap) =>
      prevRoadmap.map((repo) => {
        if (repo.id !== repoId) return repo;
        return {
          ...repo,
          issues: repo.issues.map((issue) => {
            if (issue.id !== issueId) return issue;
            
            // Cycle states: unstarted -> in-progress -> completed -> unstarted
            const nextState = 
              issue.state === 'unstarted' ? 'in-progress' :
              issue.state === 'in-progress' ? 'completed' : 'unstarted';
            
            return { ...issue, state: nextState };
          }),
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="border-b border-[#30363d] pb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#238636] to-[#2ea043]">
              Data Science Central
            </span>
          </h1>
          <p className="text-[#8b949e] mt-2">Track your roadmap from foundational math to ML production.</p>
        </header>

        <DashboardGrid roadmap={roadmap} />
        
        <div className="pt-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            Repositories <span className="text-sm bg-[#30363d] text-[#c9d1d9] py-0.5 px-2 rounded-full">{roadmap.length}</span>
          </h2>
          <RepoList roadmap={roadmap} toggleIssueState={toggleIssueState} />
        </div>
      </div>
    </div>
  );
}

export default App;
