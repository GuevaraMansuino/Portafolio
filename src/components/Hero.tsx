import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { Navbar } from './Navbar';

const ROLES = ["Desarrollador Web", "Programador", "Estudiante de UTN", "Creador"];

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(".name-reveal", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
    )
    .fromTo(".blur-in",
      { opacity: 0, filter: "blur(10px)", y: 20 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
      "-=0.8"
    );
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-bg">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-bg to-transparent" />
      </div>

      <Navbar />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl pt-20">
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          COLECCIÓN '26
        </p>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Geronimo Guevara
        </h1>

        <div className="blur-in text-lg md:text-xl font-medium mb-3">
          Un <span key={roleIndex} className="font-display italic text-text-primary inline-block animate-role-fade-in">{ROLES[roleIndex]}</span> de Mendoza.
        </div>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mx-auto mb-12">
          Estudiante de la Tecnicatura Universitaria en Programación en la UTN Mendoza. Orientado a desarrollar software funcional, escalable y diseñar interfaces modernas.
        </p>

        <div className="blur-in flex flex-col sm:flex-row items-center gap-4">
          <button className="group relative rounded-full text-sm px-7 py-3.5 hover:scale-105 transition-all bg-text-primary text-bg hover:bg-bg hover:text-text-primary">
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10">Ver Proyectos</span>
          </button>

          <button className="group relative rounded-full text-sm px-7 py-3.5 hover:scale-105 transition-all border border-stroke bg-bg text-text-primary hover:border-transparent">
             <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
             <span className="relative z-10 block bg-bg px-7 py-3.5 rounded-full -mx-7 -my-3.5">Contactar...</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Desplazar</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-full bg-text-primary absolute top-0 left-0 animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
