import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, Environment, ContactShadows, Float } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Code, ShieldCheck, Users, Cpu, ShoppingBag, X, Folder, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const FunkoModel = ({ mobile = false }: { mobile?: boolean }) => {
  const { scene, nodes } = useGLTF(import.meta.env.BASE_URL + 'funko.glb');

  const baseRotationY = 0.5;
  const baseRotationZ = 0;

  useFrame((state) => {
    if (nodes.Head) {
      const targetY = (state.pointer.x * Math.PI / 6) + baseRotationY;
      const targetZ = (state.pointer.y * Math.PI / 8) + baseRotationZ;

      nodes.Head.rotation.y = THREE.MathUtils.lerp(nodes.Head.rotation.y, targetY, 0.1);
      nodes.Head.rotation.z = THREE.MathUtils.lerp(nodes.Head.rotation.z, targetZ, 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1} floatingRange={[-0.05, 0.05]}>
      <primitive
        object={scene}
        scale={4.0}
        position={[mobile ? 0 : -0.8, -1.2, 0]}
        rotation={[0, -Math.PI / 4, 0]}
      />
    </Float>
  );
};

const PROJECTS = [
  {
    role: 'Yam Capital Humano',
    entity: 'Trabajo Actual',
    description: 'Sincronización de relojes biométricos.',
    tags: ['PHP', 'PostgreSQL', 'Node.js', 'IA'],
    icon: <Users className="w-6 h-6" />,
  },
  {
    role: 'Ser Electrónica',
    entity: 'GitHub Project - Electrónica',
    description: 'SER Electrónica es un sitio web institucional e informativo desarrollado para brindar presencia digital a la empresa y facilitar la visualización de su catálogo de productos. El sistema está diseñado bajo un enfoque responsive, garantizando una correcta visualización tanto en dispositivos móviles como en computadoras.',
    tags: ['Automatización', 'ERP', 'Inventario'],
    icon: <Cpu className="w-6 h-6" />,
    repoUrl: 'https://github.com/GuevaraMansuino/SerElectronica',
    siteUrl: 'https://electronicaser.com'
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
    repoUrl: 'https://github.com/HernanRotellini/E-commercePadel'
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
    const mm = gsap.matchMedia();

    mm.add('(max-width: 1023px)', () => {
      const cards = gsap.utils.toArray('.stacked-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${cards.length * 90}%`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      });

      cards.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card as Element, { x: 0, y: 0, opacity: 1, zIndex: 10 });
        } else {
          gsap.set(card as Element, { x: 0, y: '110vh', opacity: 0, zIndex: 10 + index });
        }
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        tl.to(card as Element, {
          y: index * 14,
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        });
      });

      return () => tl.kill();
    });

    mm.add('(min-width: 1024px)', () => {
      const cards = gsap.utils.toArray('.stacked-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${cards.length * 100}%`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      });

      cards.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card as Element, { x: 0, y: 0, opacity: 1, zIndex: 10 });
        } else {
          gsap.set(card as Element, { y: '120vh', opacity: 0, zIndex: 10 + index });
        }
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const actualTargetX = Math.min(index * 18, 72);
        const actualTargetY = index * 24;

        tl.to(card as Element, {
          y: actualTargetY,
          x: actualTargetX,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        });
      });

      return () => tl.kill();
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <>
      <section ref={sectionRef} className="bg-bg text-text-primary w-full max-w-full h-[100svh] lg:h-screen relative z-10 overflow-hidden lg:overflow-visible scroll-mt-24" id="proyectos">
        <div className="max-w-[1300px] w-full h-full mx-auto px-4 sm:px-6 md:px-10 lg:px-16 pt-[76px] pb-3 sm:pt-20 sm:pb-5 lg:py-0 flex flex-col lg:flex-row items-stretch lg:items-center relative">
          <div className="w-full lg:w-1/2 min-w-0 h-[35svh] sm:h-[38svh] lg:h-full flex flex-col lg:block items-stretch justify-start relative z-10 lg:z-20 overflow-visible">
            <div className="relative lg:absolute lg:top-24 left-0 z-10 w-full pointer-events-none mb-0 lg:mb-0">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#0C1A2B]" />
                <span className="text-[11px] sm:text-xs text-muted uppercase tracking-[0.24em] sm:tracking-[0.3em]">Destacados</span>
              </div>
              <h2 className="text-[clamp(1.75rem,9vw,3rem)] md:text-5xl lg:text-7xl text-text-primary tracking-tight leading-[0.95]">
                Proyectos <span className="font-display italic">Destacados</span>
              </h2>
            </div>

            <div className="block w-full flex-1 min-h-[150px] sm:min-h-[190px] lg:h-full relative -mt-10 sm:-mt-12 lg:mt-0 cursor-grab active:cursor-grabbing scale-115 sm:scale-110 lg:scale-100 lg:translate-x-8 origin-center overflow-visible mx-auto mask-mobile">
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
                <directionalLight position={[-10, 10, 5]} intensity={1} color="#0C1A2B" />
                <Environment preset="city" />
                <React.Suspense fallback={null}>
                  <FunkoModel mobile />
                </React.Suspense>
                <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000000" />
              </Canvas>
            </div>
          </div>

          <div className="w-full lg:w-1/2 min-w-0 h-[48svh] lg:h-full relative z-20 lg:z-10 flex items-start lg:items-center justify-center lg:justify-end pt-3 sm:pt-4 lg:pt-0">
            <div className="relative w-full max-w-[560px] lg:max-w-[480px] h-[min(44svh,345px)] lg:h-[400px] lg:-translate-x-4">
              {PROJECTS.map((proj, idx) => (
                <div
                  key={idx}
                  onClick={proj.repoUrl ? () => setSelectedProject(proj) : undefined}
                  className={`stacked-card absolute top-0 left-0 w-full max-w-full min-w-0 h-[min(41svh,315px)] lg:h-[380px] rounded-[22px] lg:rounded-[32px] bg-[#091018] border border-[#0C1A2B] lg:border-2 shadow-xl lg:shadow-2xl p-4 sm:p-5 md:p-6 lg:p-10 flex flex-col justify-between overflow-hidden ${
                    proj.repoUrl ? 'cursor-pointer hover:border-blue-900/50 transition-colors' : ''
                  }`}
                >
                  <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-[#0C1A2B]/40 to-transparent pointer-events-none" />

                  <div className="relative z-10 pointer-events-none min-w-0">
                    <div className="p-2 lg:p-3 inline-flex bg-[#0C1A2B] text-white rounded-xl mb-3 lg:mb-6 shadow-inner">
                      {proj.icon}
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1.5 lg:mb-2 leading-tight break-words">
                      {proj.role}
                    </h3>
                    <p className="text-[11px] sm:text-xs lg:text-sm font-medium text-white/50 mb-2 lg:mb-4 break-words">{proj.entity}</p>

                    <p className="text-xs sm:text-sm lg:text-base text-muted leading-relaxed line-clamp-3 break-words">
                      {proj.description}
                    </p>
                  </div>

                  <div className="relative z-10 pt-3 lg:pt-6 mt-4 lg:mt-4 border-t border-[#0C1A2B] pointer-events-none min-w-0">
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map(tag => (
                        <span key={tag} className="max-w-full text-[10px] sm:text-[11px] lg:text-xs font-mono px-2 sm:px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-full bg-[#0C1A2B]/50 border border-[#0C1A2B] text-white/80 break-words">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {proj.repoUrl && (
                    <div className="absolute top-5 right-5 lg:top-8 lg:right-8 w-8 h-8 rounded-full bg-[#0C1A2B]/60 flex items-center justify-center lg:opacity-0 lg:hover:opacity-100 transition-opacity">
                      <Folder className="w-4 h-4 text-white/70" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
              <div className="p-5 sm:p-6 md:p-8">
                <div className="flex items-start justify-between gap-12 mb-6">
                  <div className="min-w-0">
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight break-words">
                      {selectedProject.role}
                    </h3>
                    <p className="text-sm md:text-base font-medium text-[#4a72a1] mt-2 break-words">
                      {selectedProject.entity}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full hover:bg-white/5 transition-colors absolute top-5 right-5 md:top-6 md:right-6"
                  >
                    <X className="w-5 h-5 text-white/50" />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-white/60 mb-6">
                  <div className="p-3 inline-flex bg-[#0C1A2B] rounded-xl shadow-inner w-fit">
                    {selectedProject.icon}
                  </div>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-lg break-words">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8 pt-6 border-t border-[#0C1A2B]/50">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="max-w-full px-3 sm:px-4 py-1.5 bg-[#0C1A2B]/40 text-white/80 font-mono text-xs sm:text-sm rounded-full break-words">
                      {tag}
                    </span>
                  ))}
                </div>

                {selectedProject.repoUrl && (
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex max-w-full items-center gap-2 px-5 sm:px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base"
                    >
                      <Folder className="w-5 h-5 shrink-0" />
                      <span className="break-words">Ver código en GitHub</span>
                    </a>
                    {'siteUrl' in selectedProject && selectedProject.siteUrl && (
                      <a
                        href={selectedProject.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex max-w-full items-center gap-2 px-5 sm:px-6 py-3 border border-[#0C1A2B] text-white rounded-full font-medium hover:bg-white/5 transition-colors text-sm sm:text-base"
                      >
                        <ExternalLink className="w-5 h-5 shrink-0" />
                        <span className="break-words">Ver sitio web</span>
                      </a>
                    )}
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
