import React from 'react';
import ImageSequence from './components/ImageSequence';
import HeroSection from './components/HeroSection';
import FinalDashboard from './components/FinalDashboard';

function App() {
  return (
    <main className="relative bg-[#0a0a0a] text-white font-rajdhani">
      {/* Scroll-driven 3D background animation */}
      <ImageSequence />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full overflow-hidden">
        <HeroSection />
        
        {/* Massive spacer to allow the scroll animation to play completely invisible. */}
        <div className="h-[400vh]"></div>
        
        {/* The Holographic interface that appears at the very end of scroll */}
        <FinalDashboard />
        
        {/* Footer hidden safely at the bottom or removed entirely so Dashboard occupies bottom */}
      </div>
    </main>
  );
}

export default App;
