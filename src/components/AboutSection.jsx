import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../context/CMSContext';

export default function AboutSection() {
  const { data } = useCMS();
  
  return (
    <section className="relative min-h-[50vh] flex items-center z-10 px-4 md:px-20 max-w-7xl mx-auto w-full">
      <div className="w-full flex justify-end">
        <motion.div 
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="glass-card p-10 max-w-2xl text-right"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-l from-neonBlue to-white text-glow">ABOUT ME</h2>
          <p className="text-xl font-rajdhani text-gray-200 leading-relaxed text-left opacity-90 drop-shadow-md">
            {data.about}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
