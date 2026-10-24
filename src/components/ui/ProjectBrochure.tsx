import Image from 'next/image'
import { Check, Mail } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/icons'
import { SkillBadge } from '@/components/ui/SkillBadge'
import { BRAND_NAME, CONTACT_EMAIL, LOCATION, SOCIAL } from '@/lib/config'
import { cn } from '@/lib/utils'
import type { Project } from '@/data/projects'

interface ProjectBrochureProps {
  project: Project
  className?: string
}

const cleanUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

export function ProjectBrochure({ project, className }: ProjectBrochureProps) {
  const [cover, ...gallery] = project.images ?? []
  const extra = gallery.slice(0, 4)

  return (
    <article className={cn('light bg-(--bg-primary) text-(--text-primary) brochure', className)}>
      <section className="brochure-page flex flex-col">
        <header className="bg-gradient-to-br from-(--accent-primary) to-(--accent-secondary) text-(--overlay-fg) px-12 py-10">
          <p className="text-sm font-mono tracking-widest uppercase opacity-90">{BRAND_NAME} · Caso de proyecto</p>
          <h1 className="text-4xl font-bold mt-3 leading-tight">{project.title}</h1>
          <p className="mt-4 text-base leading-relaxed opacity-95">{project.description}</p>
          <span className="inline-block mt-5 text-xs px-3 py-1 rounded-full bg-(--overlay-fg)/20 font-semibold uppercase tracking-wider">
            {project.status}
          </span>
        </header>

        <div className="px-12 py-8 flex flex-col gap-7 flex-1">
          {cover && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-(--border)">
              <Image src={cover} alt={`${project.title} — captura principal`} fill sizes="800px" className="object-cover" />
            </div>
          )}

          {project.features && project.features.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-(--accent-primary) mb-3">Funciones y logros clave</h2>
              <ul className="space-y-2.5 text-sm leading-relaxed">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check size={16} className="text-(--accent-secondary) mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="brochure-page flex flex-col px-12 py-10 gap-7">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-(--accent-primary) mb-3">Sobre el proyecto</h2>
          <p className="text-sm leading-relaxed text-(--text-muted) whitespace-pre-line">
            {project.longDescription ?? project.description}
          </p>
        </div>

        {extra.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {extra.map((src, i) => (
              <div key={src} className="relative w-full aspect-video rounded-xl overflow-hidden border border-(--border)">
                <Image src={src} alt={`${project.title} — captura ${i + 2}`} fill sizes="400px" className="object-cover" />
              </div>
            ))}
          </div>
        )}

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-(--accent-primary) mb-3">Stack tecnológico</h2>
          <div className="flex flex-wrap gap-2">
            {project.techs.map((tech) => (
              <SkillBadge key={tech} tech={tech} color="indigo" className="text-xs" />
            ))}
          </div>
        </div>

        <footer className="mt-auto rounded-xl bg-(--bg-card) border border-(--border) px-6 py-5">
          <p className="font-semibold">¿Necesitas una solución similar?</p>
          <p className="text-sm text-(--text-muted) mt-1">{BRAND_NAME} · Desarrollador de software · {LOCATION}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm">
            {CONTACT_EMAIL && (
              <span className="flex items-center gap-2"><Mail size={15} />{CONTACT_EMAIL}</span>
            )}
            {SOCIAL.linkedin !== '#' && (
              <span className="flex items-center gap-2"><Linkedin size={15} />{cleanUrl(SOCIAL.linkedin)}</span>
            )}
            {SOCIAL.github !== '#' && (
              <span className="flex items-center gap-2"><Github size={15} />{cleanUrl(SOCIAL.github)}</span>
            )}
          </div>
        </footer>
      </section>
    </article>
  )
}
