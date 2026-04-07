import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

const NAV_LINKS = ["Inicio", "Proyectos", "Curriculum"];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4" style={{ position: 'fixed' }}>
      <div className={cn(
        "inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300",
        scrolled && "shadow-md shadow-black/10"
      )}>
        {/* Logo */}
        <div className="group relative flex items-center justify-center w-9 h-9 rounded-full accent-gradient hover:scale-110 transition-transform duration-300 cursor-pointer">
          <div className="absolute inset-px bg-bg rounded-full flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary">GG</span>
          </div>
        </div>

        <div className="hidden md:block w-px h-5 bg-stroke mx-3" />

        <div className="flex items-center gap-1 mx-2">
          {NAV_LINKS.map(link => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className={cn(
                "text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors",
                 active === link 
                   ? "text-text-primary bg-stroke/50" 
                   : "text-muted hover:text-text-primary hover:bg-stroke/50"
              )}
            >
              {link}
            </button>
          ))}
        </div>

        <div className="hidden md:block w-px h-5 bg-stroke mx-3" />

<a 
          href="https://wa.me/5492616648128" 
          target="_blank"
          rel="noopener noreferrer"
          className="relative group text-xs sm:text-sm rounded-full transition-all text-text-primary"
        >
           <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="relative flex items-center gap-2 bg-surface px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-md">
              Hablemos
              <ArrowUpRight className="w-4 h-4" />
           </div>
        </a>
      </div>
    </nav>
  );
};
