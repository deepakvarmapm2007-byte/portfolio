import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../context/CMSContext';

export default function EducationTimeline() {
  const { data } = useCMS();
  const steps = data.education;

  return (
    <section className="relative min-h-screen py-24 flex items-center z-10 px-4 md:px-20 max-w-7xl mx-auto w-full">
      <div className="w-full">
        <motion.h2 
          className="text-4xl md:text-6xl font-orbitron font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-white text-glow text-right"
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          EDUCATION
        </motion.h2>

        <div className="relative space-y-16 flex flex-col items-end">
          <div className="absolute top-0 bottom-0 right-0 w-0.5 bg-gradient-to-b from-neonBlue via-neonPurple to-neonBlue opacity-50 text-glow"></div>
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              className="relative flex justify-end"
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.3, duration: 1.5, ease: "easeOut" }}
            >
              <div className="relative border-r-2 border-white/10 pr-8 mr-4 md:mr-8 w-full max-w-2xl text-right">
                <div className={`absolute -right-[41px] top-1 w-5 h-5 rounded-full z-10 ${step.glow === 'neonBlue' ? 'bg-neonBlue box-glow' : 'bg-neonPurple box-glow-purple'}`}></div>
                <div className="glass-card p-8 group hover:bg-white/10 transition-colors overflow-hidden cursor-pointer">
                  <span className={`font-orbitron tracking-widest text-sm font-bold ${step.glow === 'neonBlue' ? 'text-neonBlue text-glow' : 'text-neonPurple text-glow-purple'}`}>
                    {step.year}
                  </span>
                  <h3 className="text-2xl font-rajdhani mt-2 font-semibold">
                    {step.title}
                  </h3>
                  
                  {/* Expanding detailed section on hover/touch */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                    <div className="overflow-hidden">
                      <p className="text-lg text-gray-300 font-rajdhani border-t border-white/10 pt-4 mt-4 text-glow transition-all">
                        {step.school}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
