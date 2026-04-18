import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../context/CMSContext';

export default function ProjectsGallery() {
  const { data } = useCMS();
  const projects = data.projects;

  return (
    <section className="relative min-h-screen py-24 z-10 px-4 md:px-20 max-w-7xl mx-auto w-full">
      <motion.h2 
        className="text-4xl md:text-6xl font-orbitron font-bold mb-16 text-left text-white"
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        FEATURED WORK
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj, idx) => (
          <motion.a
            key={idx}
            href={proj.url && proj.url !== '#' ? proj.url : undefined}
            target={proj.url && proj.url !== '#' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={`glass-card overflow-hidden group cursor-pointer relative h-80 flex flex-col justify-end p-8 transition-all duration-500 block`}
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.2, duration: 1.5, ease: "easeOut" }}
          >
            {/* Placeholder Background for Images/Renders */}
            <div className="absolute inset-0 bg-darkBG/40 opacity-80 z-0 transition-transform duration-700 group-hover:scale-110"></div>
            
            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t from-darkBG via-darkBG/80 to-transparent z-0 opacity-90 transition-opacity duration-300 ${proj.glow}`}></div>

            <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-neonBlue font-rajdhani uppercase tracking-widest text-sm mb-2 text-glow">
                {proj.category}
              </p>
              <h3 className="text-3xl font-orbitron font-bold mb-3">
                {proj.title}
              </h3>
              <p className="text-gray-400 font-rajdhani text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                {proj.desc}
              </p>
              {proj.url && proj.url !== '#' && (
                <span className="text-neonBlue opacity-0 group-hover:opacity-100 transition-opacity mt-2 block font-orbitron text-xs tracking-widest">
                  [ VIEW PROJECT ]
                </span>
              )}
            </div>
            <div className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 pointer-events-none ${proj.glow}`} />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
