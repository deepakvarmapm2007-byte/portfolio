import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import AboutSection from './AboutSection';
import EducationTimeline from './EducationTimeline';
import SkillsSection from './SkillsSection';
import ProjectsGallery from './ProjectsGallery';
import AdminPanel from './AdminPanel';

export default function FinalDashboard() {
  const { scrollYProgress } = useScroll();
  
  // Dashboard becomes fully visible exactly at the bottom 5% of scroll
  const opacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);
  const pointerEvents = useTransform(scrollYProgress, [0.95, 1], ['none', 'auto']);

  const [activeSection, setActiveSection] = useState(null);

  const sequence = ['about', 'education', 'skills', 'projects', 'admin'];
  const currentIndex = sequence.indexOf(activeSection);

  const goNext = () => {
    if (currentIndex < sequence.length - 1) setActiveSection(sequence[currentIndex + 1]);
  };

  const goPrev = () => {
    if (currentIndex > 0) setActiveSection(sequence[currentIndex - 1]);
  };

  const items = [
    { id: 'about', label: 'ABOUT ME', component: <AboutSection />, x: '12vw', y: '22vh', glow: 'neonBlue', rotateY: 15 },
    { id: 'education', label: 'EDUCATION', component: <EducationTimeline />, x: '73vw', y: '22vh', glow: 'neonPurple', rotateY: -15 },
    { id: 'skills', label: 'CORE SKILLS', component: <SkillsSection />, x: '10vw', y: '55vh', glow: 'neonPurple', rotateY: 20 },
    { id: 'projects', label: 'PROJECTS', component: <ProjectsGallery />, x: '75vw', y: '55vh', glow: 'neonBlue', rotateY: -20 },
    { id: 'admin', label: 'SYSTEM ADMIN', component: <AdminPanel />, x: '42vw', y: '75vh', glow: 'neonPurple', rotateY: 0, rotateX: 30 },
  ];

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ opacity, pointerEvents }}
    >
      {/* 4 Floating Holographic Options */}
      <AnimatePresence>
        {!activeSection && items.map((item, idx) => (
          <motion.div
            key={item.id}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileHover={{ scale: 1.15, textShadow: `0px 0px 15px ${item.glow === 'neonBlue' ? '#00f3ff' : '#b500ff'}` }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0, opacity: 0, rotateY: item.rotateY || 0, rotateX: item.rotateX || 0 }}
            animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -15, 0], // The "low moment" sky floating
                rotateY: item.rotateY || 0,
                rotateX: item.rotateX || 0
            }}
            transition={{ 
                y: { repeat: Infinity, duration: 4 + (idx * 0.5), ease: "easeInOut" },
                scale: { duration: 0.5, ease: "easeOut" },
                opacity: { duration: 0.5 }
            }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setActiveSection(item.id)}
            className={`absolute p-6 md:p-10 cursor-pointer glass-card border border-${item.glow}/50 bg-${item.glow}/5 hover:bg-${item.glow}/20 transition-colors flex items-center justify-center isolate group rounded-3xl backdrop-blur-md`}
            style={{ left: item.x, top: item.y, touchAction: 'none', perspective: 1000 }}
          >
            {/* Cyber Ripple Effect on Hover/Drag */}
            <div className={`absolute inset-0 border-2 border-${item.glow} rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity`}></div>
            <div className={`absolute inset-0 box-glow${item.glow === 'neonPurple' ? '-purple' : ''} rounded-3xl pointer-events-none opacity-50`}></div>
            
            <h3 className={`text-xl md:text-3xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.glow === 'neonBlue' ? 'from-neonBlue to-white text-glow' : 'from-neonPurple to-white text-glow-purple'} shadow-none select-none z-10 uppercase tracking-widest`}>
              {item.label}
            </h3>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Massive Detail Highlight Overlay */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 200 }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-7xl h-[85vh] glass-card bg-[#0a0a0a]/60 backdrop-blur-[20px] border border-white/20 overflow-hidden flex flex-col p-4 md:p-12 shadow-[0_0_50px_rgba(0,243,255,0.15)]"
          >
            <button 
              onClick={() => setActiveSection(null)}
              className="absolute top-6 right-6 md:right-10 text-gray-400 hover:text-red-400 font-orbitron tracking-widest uppercase transition-colors z-[60] flex items-center gap-3 text-sm bg-darkBG/70 px-6 py-3 rounded-full border border-white/10 hover:border-red-500/50"
            >
              <span className="text-xl leading-none">&times;</span>
              <span className="font-bold">CLOSE</span>
            </button>

            {/* Pagination Controls */}
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex gap-4 z-[60] font-orbitron tracking-widest">
              {currentIndex > 0 && (
                <button onClick={goPrev} className="px-6 py-3 bg-darkBG/80 border border-white/20 hover:border-neonPurple hover:text-neonPurple text-white rounded-full transition-all">
                  &lt; PREV
                </button>
              )}
              {currentIndex < sequence.length - 1 && (
                <button onClick={goNext} className="px-6 py-3 bg-neonBlue/20 border border-neonBlue hover:bg-neonBlue/40 text-white rounded-full transition-all">
                  NEXT &gt;
                </button>
              )}
            </div>
            
            <div id="modal-scroll-container" className="flex-1 overflow-y-auto pr-4 custom-scrollbar relative z-50 pt-10">
              {items.find(i => i.id === activeSection)?.component}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
