import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center z-10 px-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center bg-darkBG/20 p-8 rounded-3xl backdrop-blur-sm border border-white/5 shadow-2xl"
      >
        <h1 className="text-4xl md:text-7xl font-orbitron font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple text-glow uppercase">
          HI I AM DEEPAK<br/>WELCOME TO MY PORTFOLIO
        </h1>
        <p className="mt-8 text-xl md:text-2xl font-rajdhani text-white font-bold uppercase tracking-[0.2em] text-glow">
          DEEPAK <span className="text-neonBlue px-2">|</span> 3D Designer <span className="text-neonPurple px-2">|</span> Web Developer
        </p>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <p className="text-sm font-rajdhani text-neonBlue mb-2 tracking-widest uppercase text-glow">Scroll</p>
        <div className="w-px h-16 bg-gradient-to-b from-neonBlue to-transparent" />
      </motion.div>
    </section>
  );
}
