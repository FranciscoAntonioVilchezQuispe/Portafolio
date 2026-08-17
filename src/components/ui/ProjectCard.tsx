'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink, Code2 } from 'lucide-react'
import { Github } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { SkillBadge } from '@/components/ui/SkillBadge'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  index: number
  onClick?: () => void
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: 'easeOut' as const },
  }),
}

const statusColorMap = {
  'Completado': 'text-green-400',
  'En desarrollo': 'text-yellow-400',
  'Mantenimiento': 'text-orange-400',
} as const

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false) // Si falló la portada principal
  const [galleryError, setGalleryError] = useState(false) // Si falló también la de fallback
  const [currentImgIndex, setCurrentImgIndex] = useState(-1) // -1 es la imagen de portada
  const [hovered, setHovered] = useState(false)

  const hasGallery = project.images && project.images.length > 0
  const showFallback = (imgError && !hasGallery) || (imgError && galleryError) || !project.image

  useEffect(() => {
    if (!hovered || !hasGallery) return

    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => {
        if (prev === -1) return 0
        if (prev === project.images!.length - 1) return -1
        return prev + 1
      })
    }, 2200)

    return () => clearInterval(interval)
  }, [hovered, hasGallery, project.images])

  // Si la portada principal (thumb.png) falla, usamos la primera de la galería (images[0])
  const currentSrc = currentImgIndex === -1 
    ? (imgError && hasGallery ? project.images![0] : project.image) 
    : project.images![currentImgIndex]

  // Alternar efectos de borde neón
  const neonClasses = [
    'neon-border-cyan',
    'neon-border-purple',
    'neon-border-indigo'
  ]
  const neonClass = neonClasses[index % neonClasses.length]

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      custom={index}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setCurrentImgIndex(-1)
      }}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        "glass-card rounded-xl overflow-hidden flex flex-col shadow-lg cursor-pointer",
        neonClass
      )}
    >
      {/* Image container */}
      <div className="relative h-48 w-full overflow-hidden bg-[--bg-surface]">
        {showFallback ? (
          <div className="h-full w-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center">
            <Code2 className="h-12 w-12 text-indigo-400/50" />
          </div>
        ) : (
          <>
            <Image
              src={currentSrc}
              alt={project.title}
              fill
              className="object-cover transition-all duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => {
                if (currentImgIndex === -1) {
                  if (!imgError) {
                    setImgError(true)
                  } else {
                    setGalleryError(true)
                  }
                }
              }}
              unoptimized
            />
            {/* Indicadores de galería */}
            {hasGallery && hovered && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20 bg-black/40 px-2 py-1 rounded-full backdrop-blur-xs">
                <span className={cn("w-1.5 h-1.5 rounded-full transition-colors duration-300", currentImgIndex === -1 ? "bg-cyan-400 scale-125" : "bg-white/40")} />
                {project.images!.map((_, i) => (
                  <span key={i} className={cn("w-1.5 h-1.5 rounded-full transition-colors duration-300", currentImgIndex === i ? "bg-cyan-400 scale-125" : "bg-white/40")} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2 text-[--text-primary] line-clamp-1">
          {project.title}
        </h3>
        <p className="text-[--text-muted] text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techs.map((tech) => (
            <SkillBadge key={tech} tech={tech} color="indigo" className="text-xs px-2 py-0.5" />
          ))}
        </div>

        {/* Links & Status */}
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[--border]">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-sm font-medium text-[--text-muted] hover:text-[--text-primary] transition-colors"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-sm font-medium text-[--text-muted] hover:text-[--text-primary] transition-colors"
            >
              <ExternalLink size={16} />
              <span>Demo</span>
            </a>
          )}

          <span
            className={cn(
              'ml-auto text-xs px-2 py-1 bg-[--bg-surface] rounded-md font-medium border border-[--border]',
              statusColorMap[project.status]
            )}
          >
            {project.status}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
