import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../context/CMSContext';

export default function SkillsSection() {
  const { data } = useCMS();
  const skills = data.skills;

  return (
    <section className="relative min-h-[70vh] py-24 flex items-center z-10 px-4 md:px-20 max-w-7xl mx-auto w-full">
      <div className="w-full">
        <motion.h2 
          className="text-4xl md:text-6xl font-orbitron font-bold mb-16 text-left text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-white text-glow"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          CORE SKILLS
        </motion.h2>

        <div className="flex flex-wrap justify-start gap-6">
          {skills.map((skill, idx) => (
            <motion.div 
              key={idx}
              className={`glass-card px-8 py-6 cursor-pointer border border-white/5 transition-all duration-300 group ${skill.boxGlow} flex-1 min-w-[300px] overflow-hidden`}
              initial={{ x: -200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10 }}
              transition={{ delay: idx * 0.2, duration: 1.5, ease: "easeOut" }}
            >
              <h3 className={`text-2xl font-orbitron font-bold ${skill.color} ${skill.glow}`}>
                {skill.name}
              </h3>
              
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                <div className="overflow-hidden">
                  <p className="text-gray-300 font-rajdhani border-t border-white/10 pt-4 mt-4 leading-relaxed tracking-wide text-lg">
                    {skill.desc || 'No description provided. Click Admin to add details on how this works.'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
