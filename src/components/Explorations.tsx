import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Integración de estructura con imágenes reales
// (Puedes poner tus propias URLs y ajustar el texto de las Habilidades a medida)
const SKILLS = [
  { 
    text: "Trabajo en Equipo", 
    rotation: -2, 
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    text: "Comunicación Efectiva", 
    rotation: 3, 
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" 
  },
  { 
    text: "Resolución de Problemas", 
    rotation: 1, 
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    text: "Aprendizaje Rápido", 
    rotation: -4, 
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
  },
  { 
    text: "Optimización con IA", 
    rotation: 2, 
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop" 
  },
];

export const Explorations: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !leftColRef.current || !rightColRef.current) return;

    const ctx = gsap.context(() => {
      // 1. PIN THE ENTIRE SECTION
      // Al fijar la sección entera (no el cartel), GSAP añade un pin-spacer 
      // que evita que la sección colisione con Journal o SelectedWorks. 
      // La altura extra de scroll (250% del viewport) es creada automáticamente.
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=250%", 
        pin: true,
        // pinSpacing en true es el default, lo cual permite que 'Stats' 
        // aparezca fluidamente por debajo de esta sección al terminar el pin.
      });

      // 2. EFECTO PARALLAX DE LAS COLUMNAS DE TARJETAS
      // Empiezan por debajo de la pantalla y suben pasando POR ENCIMA del cartel.
      gsap.fromTo(leftColRef.current,
        { y: "100vh" },
        {
          y: "-150vh",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=250%",
            scrub: 1, 
          }
        }
      );

      gsap.fromTo(rightColRef.current,
        { y: "135vh" },
        {
          y: "-180vh",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=250%",
            scrub: 1.2,
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Transformamos a h-screen (la altura extra de scroll la crea GSAP con pinSpacing).
    <section ref={containerRef} className="relative bg-bg h-screen w-full z-10 overflow-hidden">
      
      {/* CARTEL CENTRAL (Z-0) - ESTÁ EN EL FONDO, DETRÁS DE LAS TARJETAS */}
      <div className="absolute inset-0 w-full h-full z-0 flex flex-col items-center justify-center pointer-events-none px-4">
        <div className="text-center opacity-100 transition-transform duration-700">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-6 md:w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">Competencias</span>
            <div className="w-6 md:w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-9xl text-text-primary tracking-tight mb-4 mt-4 drop-shadow-2xl font-medium">
            Habilidades <span className="font-display italic text-accent drop-shadow-md">blandas</span>
          </h2>
          <p className="text-sm md:text-lg text-muted max-w-sm md:max-w-xl mx-auto">
            Competencias y aptitudes funcionales que me permiten integrarme eficazmente, comunicar y aportar valor continuo en cada equipo.
          </p>
        </div>
      </div>

      {/* CONTENEDOR DE TARJETAS (Z-10) - PASAN POR ENCIMA DEL CARTEL */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none flex justify-center">
        <div className="w-full max-w-[1400px] px-6 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-40 h-full relative pointer-events-none">
          
          {/* Columna Izquierda */}
          <div ref={leftColRef} className="flex flex-col gap-24 items-center md:items-end pt-10 w-full pointer-events-auto">
            {SKILLS.slice(0, 3).map((item, i) => (
              <div 
                key={i} 
                className="w-full max-w-[300px] lg:max-w-[340px] aspect-4/5 rounded-[32px] overflow-hidden border border-stroke/30 shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] cursor-pointer bg-surface/50 relative flex flex-col justify-end p-8 text-left group"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                {/* Imágen de Fondo Integrada */}
                <img 
                  src={item.image} 
                  alt={item.text}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-75 group-hover:opacity-100 saturate-50 group-hover:saturate-100" 
                />
                {/* Gradiente para lectura del texto */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-bg/40 to-bg pointer-events-none" />
                
                <span className="text-2xl md:text-3xl font-display italic text-white z-10 drop-shadow-lg leading-tight">
                  {item.text}
                </span>
                <div className="w-8 h-px bg-accent mt-4 z-10 transition-all duration-300 group-hover:w-16" />
              </div>
            ))}
          </div>
          
          {/* Columna Derecha */}
          <div ref={rightColRef} className="flex flex-col gap-24 items-center md:items-start pt-10 mt-[20vh] w-full pointer-events-auto">
            {SKILLS.slice(3, 5).map((item, i) => (
              <div 
                key={i} 
                className="w-full max-w-[300px] lg:max-w-[340px] aspect-4/5 rounded-[32px] overflow-hidden border border-stroke/30 shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] cursor-pointer bg-surface/50 relative flex flex-col justify-end p-8 text-left group"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                {/* Imágen de Fondo Integrada */}
                <img 
                  src={item.image} 
                  alt={item.text}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-75 group-hover:opacity-100 saturate-50 group-hover:saturate-100" 
                />
                {/* Gradiente para lectura del texto */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-bg/40 to-bg pointer-events-none" />
                
                <span className="text-2xl md:text-3xl font-display italic text-white z-10 drop-shadow-lg leading-tight">
                  {item.text}
                </span>
                <div className="w-8 h-px bg-accent mt-4 z-10 transition-all duration-300 group-hover:w-16" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
