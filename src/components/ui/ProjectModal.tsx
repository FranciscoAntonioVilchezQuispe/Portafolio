'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Check, ExternalLink, Code2 } from 'lucide-react'
import { Github } from '@/components/ui/icons'
import { SkillBadge } from '@/components/ui/SkillBadge'
import { cn } from '@/lib/utils'
import type { Project } from '@/data/projects'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0)
  const [imgErrorMap, setImgErrorMap] = useState<Record<number, boolean>>({})
  const [imagesList, setImagesList] = useState<string[]>(() => [
    project.image,
    ...(project.images || [])
  ])

  // Bloquear el scroll de la página de fondo al abrir el modal
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handlePrev = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImgIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1))
  }

  const isImgError = imgErrorMap[currentImgIndex] || false
  const currentSrc = imagesList[currentImgIndex] || project.image

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop clickable para cerrar */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Tarjeta del modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-5xl glass-card rounded-2xl overflow-hidden flex flex-col lg:grid lg:grid-cols-12 shadow-2xl max-h-[90vh] lg:max-h-[85vh] z-10 border border-white/10"
      >
        {/* Botón de cerrar flotante */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/40 hover:bg-black/60 text-[--text-muted] hover:text-[--text-primary] border border-white/10 hover:border-cyan-500/30 transition-all hover:rotate-90 cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        {/* Sección Izquierda: Galería/Carrusel (Lg: 7 columnas) */}
        <div className="lg:col-span-7 relative h-64 sm:h-96 lg:h-full bg-black/40 flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-[--border]">
          {isImgError ? (
            <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 flex flex-col items-center justify-center gap-2">
              <Code2 className="h-16 w-16 text-indigo-400/30 animate-pulse" />
              <span className="text-xs text-[--text-muted]">Sin captura de pantalla disponible</span>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <Image
                src={currentSrc}
                alt={`${project.title} screenshot ${currentImgIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 60vw"
                onError={() => {
                  // Si falla la de portada (thumb.png), y tenemos imágenes de galería secundarias en la lista,
                  // la removemos para que no se muestre rota y saltamos a la primera disponible.
                  if (currentSrc === project.image && imagesList.length > 1) {
                    setImagesList((prev) => prev.filter((img) => img !== project.image))
                    setCurrentImgIndex(0)
                  } else {
                    setImgErrorMap((prev) => ({ ...prev, [currentImgIndex]: true }))
                  }
                }}
                priority
                unoptimized
              />
            </div>
          )}

          {/* Flechas de navegación (solo si hay más de una imagen) */}
          {imagesList.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-cyan-500/20 text-white hover:text-[--accent-secondary] border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer z-20"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-cyan-500/20 text-white hover:text-[--accent-secondary] border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer z-20"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Indicadores de posición de imagen */}
          {imagesList.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-xs border border-white/5">
              {imagesList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImgIndex(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all cursor-pointer",
                    currentImgIndex === idx ? "bg-cyan-400 scale-125" : "bg-white/30"
                  )}
                  aria-label={`Ver imagen ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sección Derecha: Información detallada (Lg: 5 columnas) */}
        <div className="lg:col-span-5 p-6 md:p-8 flex flex-col max-h-[50vh] lg:max-h-full overflow-y-auto bg-[--bg-surface]/25">
          <div className="mb-4">
            <span className="text-xs px-2.5 py-1 bg-cyan-500/10 text-[--accent-secondary] border border-cyan-500/20 rounded-md font-semibold tracking-wider uppercase">
              {project.status}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 text-[--text-primary] tracking-tight">
              {project.title}
            </h2>
          </div>

          {/* Descripción Extendida */}
          <div className="mb-6 flex-1">
            <h4 className="text-xs font-semibold text-[--text-muted] tracking-wider uppercase mb-2">Sobre el proyecto</h4>
            <p className="text-[--text-muted] text-sm leading-relaxed font-light whitespace-pre-line">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Características Clave (Features) */}
          {project.features && project.features.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-[--text-muted] tracking-wider uppercase mb-3">Funciones & Logros Clave</h4>
              <ul className="space-y-2.5 text-xs text-[--text-muted] font-light">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="p-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[--accent-secondary] mt-0.5 shrink-0">
                      <Check size={10} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stack Tecnológico */}
          <div className="mb-8">
            <h4 className="text-xs font-semibold text-[--text-muted] tracking-wider uppercase mb-3">Stack Tecnológico</h4>
            <div className="flex flex-wrap gap-2">
              {project.techs.map((tech) => (
                <SkillBadge key={tech} tech={tech} color="indigo" className="text-xs px-2.5 py-1" />
              ))}
            </div>
          </div>

          {/* Enlaces de Acción */}
          <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[--border]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[--border] text-sm font-semibold text-[--text-muted] hover:text-[--text-primary] hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all text-center"
              >
                <Github size={18} />
                <span>Ver en GitHub</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[--accent-primary] to-[--accent-secondary] text-sm font-semibold text-white hover:opacity-95 transition-opacity text-center shadow-lg shadow-indigo-500/10"
              >
                <ExternalLink size={18} />
                <span>Probar Demo</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
