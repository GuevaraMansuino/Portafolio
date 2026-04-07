import React from 'react';
import { motion } from 'framer-motion';

const EDUCATION = [
  { 
    title: "Tecnicatura Universitaria en Programación", 
    institution: "Facultad Regional Mendoza, UTN",
    date: "2024 - Presente",
    detail: "Actualmente cursando el cuarto semestre, con enfoque en desarrollo de software, bases de datos y habilidades blandas para el trabajo en equipo.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=100&h=100&auto=format&fit=crop"
  },
  { 
    title: "Bachiller en Economía y Administración", 
    institution: "Instituto Santa María de los Ángeles, Mendoza, Argentina",
    date: "2023",
    detail: "Secundaria completa.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=100&h=100&auto=format&fit=crop"
  },
  { 
    title: "Certificado de Inglés EF SET", 
    institution: "EF SET Inglés",
    date: "2025",
    detail: "Nivel: C1 (Avanzado)",
    image: "https://images.unsplash.com/photo-1546410531-ea0aca385a0a?q=80&w=100&h=100&auto=format&fit=crop"
  },
  { 
    title: "Fundamentos en Inteligencia Artificial", 
    institution: "Cisco Networking Academy / IBM",
    date: "2025",
    detail: "Curso intensivo sobre el uso y aplicación de Inteligencia Artificial en desarrollo de software, automatización y optimización de procesos.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=100&h=100&auto=format&fit=crop"
  },
];

export const Education: React.FC = () => {
  return (
    <section className="bg-bg py-16 md:py-24" id="education">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Educación</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight">
              Formación <span className="font-display italic">Académica</span>
            </h2>
            <p className="text-muted mt-4 max-w-2xl">
              Mi trayectoria educativa y certificaciones obtenidas enfocadas en tecnología y programación.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          {EDUCATION.map((item, idx) => (
            <div key={idx} className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-[24px] md:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-colors">
              <div className="flex flex-col md:flex-row md:items-center gap-6 w-full md:w-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full overflow-hidden hidden md:block">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <h3 className="text-lg sm:text-xl font-medium text-text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all">{item.title}</h3>
                  <p className="text-sm text-text-primary/80">{item.institution}</p>
                  <p className="text-sm text-muted max-w-2xl mt-1">{item.detail}</p>
                </div>
              </div>
              <div className="flex md:items-center justify-end w-full md:w-auto gap-6 text-sm text-muted uppercase tracking-widest md:px-4 shrink-0 mt-4 md:mt-0">
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

