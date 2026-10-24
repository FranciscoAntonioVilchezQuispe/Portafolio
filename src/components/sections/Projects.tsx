'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { cn } from '@/lib/utils'

type FilterCategory = 'todos' | 'android' | 'backend' | 'frontend' | 'erp' | 'devops' | 'dotnet' | 'cloud'

const filters: { label: string; value: FilterCategory }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Android', value: 'android' },
  { label: 'Backend', value: 'backend' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'ERP', value: 'erp' },
  { label: 'DevOps', value: 'devops' },
  { label: 'Cloud', value: 'cloud' },
  { label: '.NET', value: 'dotnet' },
]

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('todos')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = activeFilter === 'todos'
    ? projects
    : projects.filter(p => p.category.includes(activeFilter))

  return (
    <section id="proyectos" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionTitle
          title="Proyectos"
          subtitle="Soluciones reales desarrolladas en entornos de producción"
        />

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all border cursor-pointer',
                activeFilter === filter.value
                  ? 'bg-(--accent-primary) text-(--overlay-fg) border-(--accent-primary) shadow-md shadow-(color:--glow-indigo)/20'
                  : 'border-(--border) text-(--text-muted) hover:border-(--accent-primary)/50 hover:text-(--text-primary) bg-(--bg-card)/30'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid de proyectos */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="h-full flex"
              >
                <div className="w-full flex">
                  <ProjectCard 
                    project={project} 
                    index={index} 
                    onClick={() => setSelectedProject(project)}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mensaje si no hay proyectos */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-(--text-muted) py-20"
          >
            <p className="text-lg">No hay proyectos en esta categoría aún.</p>
          </motion.div>
        )}

      </div>

      {/* Modal Detallado de Proyecto */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
