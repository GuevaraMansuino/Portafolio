import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Folder, Star, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

const GITHUB_USERNAME = 'GuevaraMansuino';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  homepage: string | null;
  updated_at: string;
}

export const SelectedWorks: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&affiliation=owner`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
        // Recalcular GSAP para arreglar los saltos de Education/Explorations
        setTimeout(() => ScrollTrigger.refresh(), 100);
      })
      .catch(() => {
        setLoading(false);
        setTimeout(() => ScrollTrigger.refresh(), 100);
      });
  }, []);

  const getGridClass = (i: number) => {
    const patterns = [
      "md:col-span-7",
      "md:col-span-5", 
      "md:col-span-5",
      "md:col-span-7",
      "md:col-span-5",
      "md:col-span-7",
    ];
    return patterns[i % patterns.length];
  };

  const getAspectClass = (i: number) => {
    const patterns = [
      "aspect-[4/3] md:aspect-[16/9]",
      "aspect-[4/3] md:aspect-[4/5]",
      "aspect-[4/3] md:aspect-[4/5]",
      "aspect-[4/3] md:aspect-[16/9]",
      "aspect-[4/3] md:aspect-[4/5]",
      "aspect-[4/3] md:aspect-[16/9]",
    ];
    return patterns[i % patterns.length];
  };

  return (
    <section className="bg-bg py-12 md:py-16">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Proyectos Destacados</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight">
              Proyectos <span className="font-display italic">destacados</span>
            </h2>
            <p className="text-muted mt-4 max-w-sm">
              Una selección de proyectos en los que he trabajado, desde el concepto hasta el lanzamiento.
            </p>
          </div>
          
          <button className="hidden md:inline-flex group relative rounded-full mt-8 md:mt-0 items-center justify-center">
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center gap-2 bg-bg px-6 py-3 rounded-full border border-stroke text-sm text-text-primary group-hover:border-transparent transition-colors">
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {loading ? (
            <div className="md:col-span-12 flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : repos.length === 0 ? (
            <div className="md:col-span-12 text-center py-20 text-muted">
              No se pudieron cargar los proyectos
            </div>
          ) : (
            repos.map((repo, i) => (
              <div 
                key={repo.id}
                onClick={() => setSelectedRepo(repo)}
                className={cn(
                  "group relative overflow-hidden bg-surface border border-stroke rounded-3xl cursor-pointer",
                  getGridClass(i),
                  getAspectClass(i)
                )}
              >
                <div className="absolute inset-0 bg-linear-to-br from-accent/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-surface" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl md:text-6xl font-display text-accent/20">{repo.name.charAt(0).toUpperCase()}</span>
                </div>
                
                <div 
                  className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }}
                />

                <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-md transition-all duration-500 flex items-center justify-center">
                  <div className="relative">
                    <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
                    <div className="relative px-6 py-3 bg-white rounded-full text-bg text-sm font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      Ver — <span className="font-display italic text-base">{repo.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <AnimatePresence>
          {selectedRepo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div 
                className="absolute inset-0 bg-bg/80 backdrop-blur-xl"
                onClick={() => setSelectedRepo(null)}
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-surface border border-stroke rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl text-text-primary">{selectedRepo.name}</h3>
                      {selectedRepo.description && (
                        <p className="text-muted mt-2">{selectedRepo.description}</p>
                      )}
                    </div>
                    <button 
                      onClick={() => setSelectedRepo(null)}
                      className="p-2 rounded-full hover:bg-bg transition-colors"
                    >
                      <X className="w-5 h-5 text-muted" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedRepo.language && (
                      <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                        {selectedRepo.language}
                      </span>
                    )}
                    {selectedRepo.topics?.slice(0, 4).map(topic => (
                      <span key={topic} className="px-3 py-1 bg-accent/5 text-muted text-sm rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 text-muted">
                      <Star className="w-5 h-5" />
                      <span>{selectedRepo.stargazers_count}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a 
                      href={selectedRepo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white text-bg rounded-full font-medium hover:bg-accent transition-colors"
                    >
                      <Folder className="w-5 h-5" />
                      Ver código
                    </a>
                    {selectedRepo.homepage && (
                      <a 
                        href={selectedRepo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 border border-stroke text-text-primary rounded-full hover:bg-bg transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
