import { useState, createContext, useContext, useEffect } from 'react';

const CMSContext = createContext();

const initialData = {
  about: "I am Deepak, a B.Sc. Computer Science student at Arulmigu Kalasalingam College of Arts and Science. I am deeply passionate about 3D Design, Web Development, and creating immersive user experiences that combine technology with futuristic art styles.",
  education: [
    {
      year: '10th Standard',
      title: 'Secondary Education',
      school: 'Government High School, Maraverperungudi',
      glow: 'neonBlue'
    },
    {
      year: '12th Standard',
      title: 'Higher Secondary',
      school: 'Government Higher Secondary School, M Reddipatti',
      glow: 'neonPurple'
    },
    {
      year: 'B.Sc. CS',
      title: 'Undergraduate Degree',
      school: 'Arulmigu Kalasalingam College of Arts and Science, Krishnan Kovil',
      glow: 'neonBlue'
    }
  ],
  skills: [
    { name: 'C', desc: 'Used for fundamental systems programming, memory management, and high-performance applications.', color: 'text-neonBlue', glow: 'text-glow', boxGlow: 'hover:box-glow' },
    { name: 'Python', desc: 'Empowers data manipulation, AI integration, and rapid backend scripting.', color: 'text-neonPurple', glow: 'text-glow-purple', boxGlow: 'hover:box-glow-purple' },
    { name: 'React', desc: 'Drives dynamic, component-based user interfaces and single-page applications.', color: 'text-neonBlue', glow: 'text-glow', boxGlow: 'hover:box-glow' },
    { name: 'Tailwind CSS', desc: 'Enables rapid, utility-first styling for creating responsive and stunning UI designs.', color: 'text-white', glow: '', boxGlow: 'hover:box-glow' },
    { name: '3D Design', desc: 'Crafts immersive environments and future-tech modeling using specialized 3D software.', color: 'text-neonPurple', glow: 'text-glow-purple', boxGlow: 'hover:box-glow-purple' }
  ],
  projects: [
    {
      title: 'Personal Portfolio',
      category: 'Web Development',
      desc: 'High-end futuristic portfolio built with React & Framer Motion.',
      glow: 'group-hover:box-glow',
      url: '#'
    },
    {
      title: 'E-commerce Platform',
      category: 'Web Development',
      desc: 'Modern web app with full functionality.',
      glow: 'group-hover:box-glow-purple',
      url: '#'
    },
    {
      title: 'Environment Render',
      category: '3D Design',
      desc: 'Cinematic cyber-tech placeholder for 3D showcase.',
      glow: 'group-hover:box-glow',
      url: '#'
    },
    {
      title: 'Character Model',
      category: '3D Design',
      desc: 'Futuristic character modeling.',
      glow: 'group-hover:box-glow-purple',
      url: '#'
    }
  ]
};

export function CMSProvider({ children }) {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('portfolioData');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  return (
    <CMSContext.Provider value={{ data, setData }}>
      {children}
    </CMSContext.Provider>
  );
}

export const useCMS = () => useContext(CMSContext);
