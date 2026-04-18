import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function AdminPanel() {
  const { data, setData } = useCMS();
  
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'deepakvarmapm2007@gmail.com' && password === 'Deepak@2007') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('ACCESS DENIED: Invalid email or password.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="glass-card p-10 border border-red-500/30 max-w-md w-full relative overflow-hidden">
          {/* Cyber Security Background Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <h2 className="text-3xl font-orbitron font-bold text-red-500 text-glow-red mb-2 uppercase tracking-widest text-center">SYSTEM LOCKED</h2>
          <p className="text-gray-400 font-rajdhani text-center mb-8 bg-black/20 p-2 rounded">Authorized Access Only</p>
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div>
              <label className="block text-white mb-2 font-orbitron text-sm">Target Email</label>
              <input 
                type="email"
                className="w-full bg-[#0a0a0a]/80 border border-white/20 rounded-xl p-3 text-white font-rajdhani focus:border-red-500 outline-none transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email..."
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2 font-orbitron text-sm">Access Code</label>
              <input 
                type="password"
                className="w-full bg-[#0a0a0a]/80 border border-white/20 rounded-xl p-3 text-white font-rajdhani focus:border-red-500 outline-none transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                required
              />
            </div>
            
            {error && <p className="text-red-500 font-rajdhani text-sm text-center">{error}</p>}
            
            <button 
              type="submit" 
              className="w-full py-4 bg-red-500/10 hover:bg-red-500/30 border border-red-500/50 text-red-100 font-orbitron font-bold tracking-widest rounded-xl transition-all uppercase"
            >
              INITIALIZE LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col overflow-y-auto px-4 md:px-20 py-10 max-w-5xl mx-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-orbitron font-bold text-neonBlue text-glow">ADMIN (CMS)</h2>
        <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/30 font-orbitron text-sm rounded-lg transition-colors">LOCK SYSTEM</button>
      </div>
      
      {/* About Section Edit */}
      <div className="mb-12 glass-card p-6 border border-white/5">
        <h3 className="text-2xl font-orbitron mb-4 text-neonPurple">About Me Content</h3>
        <textarea 
          className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-xl p-4 text-white font-rajdhani text-xl focus:border-neonBlue outline-none min-h-[150px]"
          value={data.about}
          onChange={(e) => setData({ ...data, about: e.target.value })}
        />
      </div>

      {/* Education Edit */}
      <div className="mb-12 glass-card p-6 border border-white/5 relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-orbitron text-neonPurple">Education Settings</h3>
          <button 
            onClick={() => {
              const newEdu = [...data.education, { year: 'New Year', title: 'New Details', school: 'School Name', glow: 'neonBlue' }];
              setData({ ...data, education: newEdu });
            }}
            className="text-xs font-orbitron bg-neonBlue/10 hover:bg-neonBlue/30 text-neonBlue px-3 py-1 rounded transition-colors border border-neonBlue/30"
          >
            + ADD ENTRY
          </button>
        </div>
        {data.education.map((edu, idx) => (
          <div key={idx} className="mb-6 p-4 border border-white/10 rounded-xl relative group">
            <button 
              onClick={() => {
                const newEdu = data.education.filter((_, i) => i !== idx);
                setData({ ...data, education: newEdu });
              }}
              className="absolute top-4 right-4 text-xs font-orbitron bg-red-500/10 hover:bg-red-500/30 text-red-400 px-2 py-1 rounded transition-colors opacity-0 group-hover:opacity-100"
            >
              DELETE
            </button>
            <label className="block text-neonBlue mb-1 font-orbitron text-sm">Year</label>
            <input 
              className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-xl p-2 text-white font-rajdhani mb-3 focus:border-neonBlue outline-none pr-20"
              value={edu.year}
              onChange={(e) => {
                const newEdu = [...data.education];
                newEdu[idx].year = e.target.value;
                setData({ ...data, education: newEdu });
              }}
            />
            <label className="block text-neonBlue mb-1 font-orbitron text-sm">Overview</label>
            <input 
              className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-xl p-2 text-white font-rajdhani mb-3 focus:border-neonBlue outline-none"
              value={edu.title}
              onChange={(e) => {
                const newEdu = [...data.education];
                newEdu[idx].title = e.target.value;
                setData({ ...data, education: newEdu });
              }}
            />
            <label className="block text-neonBlue mb-1 font-orbitron text-sm">Detailed School String</label>
            <textarea 
              className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-xl p-2 text-white font-rajdhani focus:border-neonBlue outline-none"
              value={edu.school}
              onChange={(e) => {
                const newEdu = [...data.education];
                newEdu[idx].school = e.target.value;
                setData({ ...data, education: newEdu });
              }}
            />
          </div>
        ))}
      </div>

      {/* Skills Edit */}
      <div className="mb-12 glass-card p-6 border border-white/5 relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-orbitron text-neonPurple">Skills Settings</h3>
          <button 
            onClick={() => {
              const newSkills = [...data.skills, { name: 'New Skill', color: 'text-white', glow: '', boxGlow: 'hover:box-glow' }];
              setData({ ...data, skills: newSkills });
            }}
            className="text-xs font-orbitron bg-neonBlue/10 hover:bg-neonBlue/30 text-neonBlue px-3 py-1 rounded transition-colors border border-neonBlue/30"
          >
            + ADD SKILL
          </button>
        </div>
        {data.skills.map((skill, idx) => (
          <div key={idx} className="mb-6 p-4 border border-white/10 rounded-xl relative group">
             <button 
              onClick={() => {
                const newSkills = data.skills.filter((_, i) => i !== idx);
                setData({ ...data, skills: newSkills });
              }}
              className="absolute top-4 right-4 text-xs font-orbitron bg-red-500/10 hover:bg-red-500/30 text-red-400 px-2 py-1 rounded transition-colors opacity-0 group-hover:opacity-100"
            >
              DELETE
            </button>
            <label className="block text-neonBlue mb-1 font-orbitron text-sm">Skill Name</label>
            <input 
              className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-xl p-2 text-white font-rajdhani focus:border-neonBlue outline-none pr-20"
              value={skill.name}
              onChange={(e) => {
                const newSkills = [...data.skills];
                newSkills[idx].name = e.target.value;
                setData({ ...data, skills: newSkills });
              }}
            />
            <label className="block text-neonBlue mb-1 mt-4 font-orbitron text-sm">How it works / Purpose</label>
            <textarea 
              className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-xl p-2 text-white font-rajdhani focus:border-neonBlue outline-none min-h-[80px]"
              value={skill.desc ?? ''}
              onChange={(e) => {
                const newSkills = [...data.skills];
                newSkills[idx].desc = e.target.value;
                setData({ ...data, skills: newSkills });
              }}
              placeholder="Describe what you use this skill for..."
            />
          </div>
        ))}
      </div>

      {/* Projects Edit */}
      <div className="mb-12 glass-card p-6 border border-white/5 relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-orbitron text-neonBlue">Projects Library</h3>
          <button 
            onClick={() => {
              const newProj = [...data.projects, { title: 'New Project', category: 'New Category', desc: 'Project Description', glow: 'group-hover:box-glow' }];
              setData({ ...data, projects: newProj });
            }}
            className="text-xs font-orbitron bg-neonBlue/10 hover:bg-neonBlue/30 text-neonBlue px-3 py-1 rounded transition-colors border border-neonBlue/30"
          >
            + ADD PROJECT
          </button>
        </div>
        {data.projects.map((proj, idx) => (
          <div key={idx} className="mb-6 p-4 border border-white/10 rounded-xl relative group">
            <button 
              onClick={() => {
                const newProj = data.projects.filter((_, i) => i !== idx);
                setData({ ...data, projects: newProj });
              }}
              className="absolute top-4 right-4 text-xs font-orbitron bg-red-500/10 hover:bg-red-500/30 text-red-400 px-2 py-1 rounded transition-colors opacity-0 group-hover:opacity-100"
            >
              DELETE
            </button>
            <label className="block text-neonBlue mb-1 font-orbitron text-sm">Project Title</label>
            <input 
              className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-xl p-2 text-white font-rajdhani mb-3 focus:border-neonBlue outline-none pr-20"
              value={proj.title}
              onChange={(e) => {
                const newProj = [...data.projects];
                newProj[idx].title = e.target.value;
                setData({ ...data, projects: newProj });
              }}
            />
            <label className="block text-neonBlue mb-1 font-orbitron text-sm">Description</label>
            <textarea 
              className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-xl p-2 text-white font-rajdhani focus:border-neonBlue outline-none min-h-[100px] mb-3"
              value={proj.desc}
              onChange={(e) => {
                const newProj = [...data.projects];
                newProj[idx].desc = e.target.value;
                setData({ ...data, projects: newProj });
              }}
            />
            <label className="block text-neonBlue mb-1 font-orbitron text-sm">Project Link / URL</label>
            <input 
              className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-xl p-2 text-white font-rajdhani focus:border-neonBlue outline-none"
              value={proj.url || ''}
              onChange={(e) => {
                const newProj = [...data.projects];
                newProj[idx].url = e.target.value;
                setData({ ...data, projects: newProj });
              }}
              placeholder="https://..."
            />
          </div>
        ))}
      </div>

    </div>
  );
}
