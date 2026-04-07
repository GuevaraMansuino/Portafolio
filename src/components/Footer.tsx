import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export const Footer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const frases = [
    "CONSTRUYENDO EL FUTURO",
    "LA EXPERIENCIA SUMA, LA CAPACIDAD DEFINE",
    "EL TALENTO NO SIEMPRE SE MIDE EN AÑOS",
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const source = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls({ startPosition: -1 });
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
         video.play().catch(e => console.log(e));
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = source;
      video.addEventListener('loadedmetadata', () => {
         video.play().catch(e => console.log(e));
      });
    }
  }, []);

  return (
    <footer className="relative bg-bg pt-24 md:pt-32 pb-8 md:pb-12 overflow-hidden flex flex-col justify-end min-h-[600px]">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-linear-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 mb-20 mt-12">
        <div className="w-8 h-px bg-stroke mb-8" />
        <h2 className="text-5xl md:text-7xl lg:text-8xl text-text-primary tracking-tight text-center mb-10 drop-shadow-2xl">
          ¿Listo para <span className="font-display italic">colaborar?</span>
        </h2>
        
        <a href="mailto:gguevaraman@gmail.com" className="group relative inline-flex rounded-full items-center justify-center shadow-xl">
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative px-8 py-5 bg-surface backdrop-blur-md rounded-full text-text-primary text-sm md:text-base transition-colors group-hover:bg-bg border border-white/10">
              gguevaraman@gmail.com
            </div>
        </a>
      </div>

      <div className="relative z-10 w-full overflow-hidden mb-16 md:mb-24 py-4 border-y border-stroke/30 shadow-2xl">
        <div className="animate-marquee hover:[animation-play-state:paused] whitespace-nowrap flex w-max">
          {[...Array(2)].map((_, i: number) => (
            <div key={i} className="flex">
              {frases.map((frase: string, index: number) => (
                <span key={`${i}-${index}`} className="text-4xl md:text-6xl font-display text-text-primary mx-4">
                  {frase} <span className="text-accent mx-4 md:mx-8">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-3 bg-surface/50 backdrop-blur-md px-4 py-2 rounded-full border border-stroke/50 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-text-primary font-medium">Disponible para proyectos</span>
        </div>
        
        <div className="flex items-center gap-6 text-muted">
          <a href="https://www.linkedin.com/in/gero-guevara-mansuino/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">LinkedIn</a>
          <a href="https://github.com/GuevaraMansuino" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
};
