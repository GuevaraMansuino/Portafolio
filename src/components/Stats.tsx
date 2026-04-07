import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: "2+", label: "Años de Experiencia" },
  { value: "15+", label: "Proyectos" },
  { value: "100%", label: "Compromiso" },
];

export const Stats: React.FC = () => {
  return (
    <section className="bg-bg py-16 md:py-24 border-y border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-stroke">
          {STATS.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col items-center justify-center pt-8 first:pt-0 md:pt-0"
            >
              <div className="text-6xl lg:text-7xl font-display text-text-primary tracking-tighter mb-4">
                {stat.value}
              </div>
              <div className="text-sm text-muted uppercase tracking-[0.2em]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
