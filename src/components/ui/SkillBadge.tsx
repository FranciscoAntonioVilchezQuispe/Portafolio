import { cn } from '@/lib/utils'
import type { SkillColor } from '@/data/skills'

interface SkillBadgeProps {
  tech: string
  color?: SkillColor
  className?: string
}

const colorMap = {
  indigo: 'bg-(--glow-indigo)/10 text-(--glow-indigo-soft) border-(--glow-indigo)/30',
  cyan: 'bg-(--glow-cyan)/10 text-(--glow-cyan-soft) border-(--glow-cyan)/30',
  violet: 'bg-(--skill-violet)/10 text-(--skill-violet-text) border-(--skill-violet)/30',
  emerald: 'bg-(--skill-emerald)/10 text-(--skill-emerald-text) border-(--skill-emerald)/30',
  orange: 'bg-(--skill-orange)/10 text-(--skill-orange-text) border-(--skill-orange)/30',
  gray: 'bg-(--skill-gray)/10 text-(--skill-gray-text) border-(--skill-gray)/30',
  rose: 'bg-(--skill-rose)/10 text-(--skill-rose-text) border-(--skill-rose)/30',
  amber: 'bg-(--skill-amber)/10 text-(--skill-amber-text) border-(--skill-amber)/30',
} as const

export function SkillBadge({ tech, color = 'indigo', className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        'px-3 py-1 rounded-full text-sm font-medium border theme-transition',
        colorMap[color],
        className
      )}
    >
      {tech}
    </span>
  )
}
