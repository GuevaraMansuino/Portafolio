import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, Environment, ContactShadows, Float } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Code, ShieldCheck, Users, Cpu, ShoppingBag, X, Folder } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Subcomponente del Modelo 3D (Cabeza animada)
const FunkoModel = () => {
  const { scene, nodes } = useGLTF('/funko.glb');

  // Ajustes de rotación base: modifica estos valores para que el Funko mire al frente (pruebas con 0.5, -0.5, 1.0, etc.)
  const baseRotationY = 0.5;
  const baseRotationZ = 0;

  useFrame((state) => {
    if (nodes.Head) {
      // Ángulos objetivo sumando la compensación (offset)
      const targetY = (state.pointer.x * Math.PI / 6) + baseRotationY;
      const targetZ = (state.pointer.y * Math.PI / 8) + baseRotationZ;

      // Interpolación suave y directa
      nodes.Head.rotation.y = THREE.MathUtils.lerp(nodes.Head.rotation.y, targetY, 0.1);
      nodes.Head.rotation.z = THREE.MathUtils.lerp(nodes.Head.rotation.z, targetZ, 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1} floatingRange={[-0.05, 0.05]}>
      <primitive
        object={scene}
        scale={4.0}
        position={[-1.2, -1.2, 0]}
        rotation={[0, -Math.PI / 4, 0]}
      />
    </Float>
  );
};

const PROJECTS = [
  {
    role: 'Yam Capital Humano',
    entity: 'Trabajo Anterior',
    description: 'Coordinación de reclutamiento y gestión de talento.',
    tags: ['Reclutamiento', 'Gestión', 'Talento'],
    icon: <Users className="w-6 h-6" />,
    // Sin repoUrl para evitar que sea clickeable
  },
  {
    role: 'Ser Electrónica',
    entity: 'GitHub Project - Electrónica',
    description: 'Automatización de inventario y ERP.',
    tags: ['Automatización', 'ERP', 'Inventario'],
    icon: <Cpu className="w-6 h-6" />,
    repoUrl: 'https://github.com/GuevaraMansuino'
  },
  {
    role: 'Tesis Ciberseguridad',
    entity: 'GitHub Project - Seguridad',
    description: 'Investigación sobre FIM-IPS y endurecimiento de sistemas.',
    tags: ['FIM-IPS', 'Python', 'Seguridad'],
    icon: <ShieldCheck className="w-6 h-6" />,
    repoUrl: 'https://github.com/GuevaraMansuino/TesisCyberseguridad_FIM'
  },
  {
    role: 'E-commerce Pádel',
    entity: 'GitHub Project - Web',
    description: 'Backend, Mercado Pago webhooks y pasarela de pago.',
    tags: ['Backend', 'Webhooks', 'Pagos'],
    icon: <ShoppingBag className="w-6 h-6" />,
    repoUrl: 'https://github.com/GuevaraMansuino'
  },
  {
    role: 'Portfolio Interactivo',
    entity: 'Proyecto Actual - 3D/Web',
    description: 'Desarrollo de esta interfaz con GSAP, R3F y Spline.',
    tags: ['React', 'GSAP', 'R3F'],
    icon: <Code className="w-6 h-6" />,
    repoUrl: 'https://github.com/GuevaraMansuino/Portafolio'
  }
];

export const Jobs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  
  useGSAP(() => {
    const cards = gsap.utils.toArray('.stacked-card');
    
    // GSAP Timeline vinculada a la fijación de la sección
    // Pin: true inmoviliza toda la sección dándonos 300% del viewport para scrollear tranquilamente
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${cards.length * 100}%`,
        scrub: 1,     // scrub suave
        pin: true,    // La sección se "clava" a la pantalla
        pinSpacing: true, // Crea el espacio necesario fantasma
      }
    });

    // Estado inicial de las tarjetas
    cards.forEach((card, index) => {
      if (index === 0) {
        // La primera tarjeta ya está visible pero sin offset
        gsap.set(card as Element, { x: 0, y: 0, zIndex: 10 });
      } else {
        // Las siguientes inician escondidas mucho más abajo
        gsap.set(card as Element, { y: '120vh', opacity: 0, zIndex: 10 + index });
      }
    });

    // Animación interactiva en el scroll
    cards.forEach((card, index) => {
      if (index === 0) return; // Salteamos la primera porque no entra animada de este modo
      
      const actualTargetX = index * 25; // 25px offset acumulativo a la derecha
      const actualTargetY = index * 25; // 25px offset acumulativo hacia abajo

      tl.to(card as Element, {
        y: actualTargetY,
        x: actualTargetX,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      });
    });

  }, { scope: sectionRef });

  return (
    <>
      <section ref={sectionRef} className="bg-bg text-text-primary w-full h-screen relative z-10 overflow-hidden" id="projects">
        {/* Contenedor central a 2 columnas fijas */}
        <div className="max-w-[1300px] h-full mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center relative">
          
          {/* COLUMNA IZQUIERDA: 3D MODEL COMPLETAMENTE ESTÁTICO */}
          <div className="w-full md:w-1/2 h-[40vh] md:h-full flex items-center justify-center relative">
            <div className="absolute top-10 left-0 md:top-24 z-10 w-full pointer-events-none">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#0C1A2B]" />
                <span className="text-xs text-muted uppercase tracking-[0.3em]">Destacados</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl text-text-primary tracking-tight">
                Proyectos <span className="font-display italic">Destacados</span>
              </h2>
            </div>

            <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
                <directionalLight position={[-10, 10, 5]} intensity={1} color="#0C1A2B" />
                <Environment preset="city" />
                <React.Suspense fallback={null}>
                  <FunkoModel />
                </React.Suspense>
                <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000000" />
              </Canvas>
            </div>
          </div>

          {/* COLUMNA DERECHA: STACKED CARDS EN POSITION ABSOLUTE */}
          <div className="w-full md:w-1/2 h-[60vh] md:h-full relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] h-[400px]">
               {PROJECTS.map((proj, idx) => (
                 <div 
                   key={idx} 
                   onClick={proj.repoUrl ? () => setSelectedProject(proj) : undefined}
                   className={`stacked-card absolute top-0 left-0 w-full h-[380px] rounded-[32px] bg-[#091018] border-2 border-[#0C1A2B] shadow-2xl p-8 md:p-10 flex flex-col justify-between overflow-hidden ${
                     proj.repoUrl ? 'cursor-pointer hover:border-blue-900/50 transition-colors' : ''
                   }`}
                 >
                   {/* Sutil resplandor o gradiente arriba */}
                   <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0C1A2B]/40 to-transparent pointer-events-none" />

                   <div className="relative z-10 pointer-events-none">
                     <div className="p-3 inline-flex bg-[#0C1A2B] text-white rounded-xl mb-6 shadow-inner">
                       {proj.icon}
                     </div>
                     
                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                       {proj.role}
                     </h3>
                     <p className="text-sm font-medium text-white/50 mb-4">{proj.entity}</p>
                     
                     <p className="text-sm md:text-base text-muted leading-relaxed line-clamp-3">
                       {proj.description}
                     </p>
                   </div>

                   <div className="relative z-10 pt-6 mt-4 border-t border-[#0C1A2B] pointer-events-none">
                     <div className="flex flex-wrap gap-2">
                       {proj.tags.map(tag => (
                         <span key={tag} className="text-xs font-mono px-3 py-1.5 rounded-full bg-[#0C1A2B]/50 border border-[#0C1A2B] text-white/80 shrink-0">
                           {tag}
                         </span>
                       ))}
                     </div>
                   </div>
                   
                   {/* Si es clickeable, mostrar pequeño indicador visual */}
                   {proj.repoUrl && (
                      <div className="absolute top-8 right-8 w-8 h-8 rounded-full bg-[#0C1A2B]/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Folder className="w-4 h-4 text-white/70" />
                      </div>
                   )}
                 </div>
               ))}
            </div>
          </div>

        </div>
      </section>

      {/* MODAL EMERGENTE (Idéntico a SelectedWorks) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div 
              className="absolute inset-0 bg-transparent backdrop-blur-xl"
              style={{ backgroundColor: 'rgba(5, 8, 12, 0.85)' }}
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#091018] border border-[#0C1A2B] rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      {selectedProject.role}
                    </h3>
                    <p className="text-sm md:text-base font-medium text-[#4a72a1] mt-2">
                      {selectedProject.entity}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full hover:bg-white/5 transition-colors absolute top-6 right-6"
                  >
                    <X className="w-5 h-5 text-white/50" />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-white/60 mb-6">
                   <div className="p-3 inline-flex bg-[#0C1A2B] rounded-xl shadow-inner">
                      {selectedProject.icon}
                   </div>
                   <p className="text-base md:text-lg leading-relaxed max-w-lg">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8 pt-6 border-t border-[#0C1A2B]/50">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-[#0C1A2B]/40 text-white/80 font-mono text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {selectedProject.repoUrl && (
                  <div className="flex gap-4">
                    <a 
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
                    >
                      <Folder className="w-5 h-5" />
                      Ver código en GitHub
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
