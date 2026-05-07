import React from 'react';
import { motion } from 'framer-motion';

const EDUCATION = [
  {
    title: "Tecnicatura Universitaria en Programación",
    institution: "Facultad Regional Mendoza, UTN",
    date: "2024 - Presente",
    detail: "Actualmente cursando el cuarto semestre, con enfoque en desarrollo de software, bases de datos y habilidades blandas para el trabajo en equipo.",
    skills: ["Software", "Bases de datos", "Trabajo en equipo"]
  },
  {
    title: "Bachiller en Economía y Administración",
    institution: "Instituto Santa María de los Ángeles, Mendoza, Argentina",
    date: "2023",
    detail: "Secundaria completa.",
    skills: ["Administración", "Economía"]
  },
  {
    title: "Certificado de Inglés EF SET",
    institution: "EF SET Inglés",
    date: "2025",
    detail: "Nivel: C1 (Avanzado).",
    skills: ["Inglés C1", "Comunicación"]
  },
  {
    title: "Fundamentos en Inteligencia Artificial",
    institution: "Cisco Networking Academy / IBM",
    date: "2025",
    detail: "Curso intensivo sobre el uso y aplicación de Inteligencia Artificial en desarrollo de software, automatización y optimización de procesos.",
    skills: ["IA", "Automatización", "Optimización"]
  },
];

export const Education: React.FC = () => {
  return (
    <section className="bg-bg py-14 md:py-24 overflow-x-clip" id="education">
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-9 md:mb-12"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-[11px] sm:text-xs text-muted uppercase tracking-[0.24em] sm:tracking-[0.3em]">Educación</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[0.98]">
              Formación <span className="font-display italic">Académica</span>
            </h2>
            <p className="text-sm sm:text-base text-muted mt-4 max-w-2xl">
              Mi trayectoria educativa y certificaciones obtenidas enfocadas en tecnología y programación.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {EDUCATION.map((item, idx) => (
            <div
              key={idx}
              className="group w-full min-w-0 rounded-[22px] md:rounded-[28px] bg-surface/30 hover:bg-surface border border-stroke transition-colors p-5 sm:p-6 md:p-7"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-8">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.16em] text-accent/70 mb-2 break-words">
                    {item.institution}
                  </p>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-text-primary leading-tight break-words group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted max-w-3xl mt-3 leading-relaxed break-words">
                    {item.detail}
                  </p>
                </div>

                <div className="flex md:flex-col md:items-end gap-3 md:gap-4 shrink-0">
                  <span className="w-fit text-xs sm:text-sm text-muted uppercase tracking-[0.16em] md:tracking-widest">
                    {item.date}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-stroke/70">
                {item.skills.map(skill => (
                  <span
                    key={skill}
                    className="max-w-full rounded-full border border-stroke bg-bg/40 px-3 py-1.5 text-[11px] sm:text-xs font-mono text-text-primary/75 break-words"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
