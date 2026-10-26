import { ChevronDown, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProjectModule, ProjectModuleGroup } from '@/data/projects'

interface ProjectScopeProps {
  groups: ProjectModuleGroup[]
  onShowImage?: (module: ProjectModule) => void
  activeImage?: string
  className?: string
}

export function ProjectScope({ groups, onShowImage, activeImage, className }: ProjectScopeProps) {
  const total = groups.reduce((sum, g) => sum + g.modules.length, 0)
  const hasThirdParty = groups.some((g) => g.modules.some((m) => m.thirdParty))

  return (
    <div className={cn('space-y-2', className)}>
      <h4 className="text-xs font-semibold text-(--text-muted) tracking-wider uppercase mb-3">
        Alcance: {total} módulos en {groups.length} áreas
      </h4>
      {groups.map((group) => (
        <details key={group.area} className="group rounded-xl border border-(--border) bg-(--bg-card)/30">
          <summary className="flex items-center justify-between gap-3 px-4 py-2.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-sm font-medium text-(--text-primary)">
            <span>{group.area}</span>
            <span className="flex items-center gap-2 text-xs text-(--text-muted) font-normal">
              {group.modules.length} {group.modules.length === 1 ? 'módulo' : 'módulos'}
              <ChevronDown size={14} className="transition-transform group-open:rotate-180" />
            </span>
          </summary>
          <ul className="px-4 pb-3 space-y-2.5">
            {group.modules.map((m) => (
              <li key={m.name} className="text-xs leading-relaxed">
                <span className="font-semibold text-(--text-primary)">
                  {m.name}
                  {m.thirdParty && <span className="text-(--accent-secondary)"> *</span>}
                </span>
                <span className="block text-(--text-muted) font-light">{m.description}</span>
                {m.image && onShowImage && (
                  <button
                    type="button"
                    onClick={() => onShowImage(m)}
                    aria-pressed={activeImage === m.image}
                    className={cn(
                      'mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-medium transition-colors cursor-pointer',
                      activeImage === m.image
                        ? 'border-(--glow-cyan)/50 bg-(--glow-cyan)/10 text-(--accent-secondary)'
                        : 'border-(--border) text-(--text-muted) hover:text-(--text-primary) hover:border-(--glow-cyan)/30'
                    )}
                  >
                    <ImageIcon size={12} />
                    {activeImage === m.image ? 'Mostrando captura' : 'Ver captura'}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </details>
      ))}
      {hasThirdParty && (
        <p className="text-xs text-(--text-muted) font-light pt-1">
          <span className="text-(--accent-secondary)">*</span> Módulo de terceros integrado y configurado
        </p>
      )}
    </div>
  )
}
