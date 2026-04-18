import React, { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function ImageSequence() {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  // Use Vite's import.meta.glob to dynamically import all images from the root directory
  const frameModules = import.meta.glob('../../ezgif-frame-*.jpg', { eager: true, query: '?url', import: 'default' });
  
  // Sort and extract the URLs
  const frameUrls = Object.entries(frameModules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([_, url]) => url);

  const frameCount = frameUrls.length || 240;
  const images = useRef([]);

  useEffect(() => {
    // Preload images
    frameUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      images.current.push(img);
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    
    // Initial draw
    const renderFirstFrame = () => {
        if (!frameUrls.length) return;
        const firstImg = new Image();
        firstImg.src = frameUrls[0];
        firstImg.onload = () => {
            canvas.width = firstImg.naturalWidth;
            canvas.height = firstImg.naturalHeight;
            context.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
        };
    };

    renderFirstFrame();

    const unsubscribe = scrollYProgress.onChange((latest) => {
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(latest * frameCount)
      );
      
      const img = images.current[frameIndex];
      // Only draw if image is loaded
      if (img && img.complete && img.naturalHeight !== 0) {
        requestAnimationFrame(() => {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        });
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.3, 0.4]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden pointer-events-none flex justify-center items-center">
        <canvas 
            ref={canvasRef} 
            className="w-full h-full object-contain max-w-full"
        />
        <motion.div 
            className="absolute inset-0 bg-[#0a0a0a] z-1"
            style={{ opacity: overlayOpacity }}
        />
    </div>
  );
}
