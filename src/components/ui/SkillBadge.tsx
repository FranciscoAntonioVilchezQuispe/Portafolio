import { cn } from '@/lib/utils'

export type SkillBadgeColor =
  | 'indigo'
  | 'cyan'
  | 'violet'
  | 'emerald'
  | 'orange'
  | 'gray'
  | 'rose'
  | 'amber'

interface SkillBadgeProps {
  tech: string
  color?: SkillBadgeColor
  className?: string
}

const colorMap = {
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  violet: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  gray: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
  rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
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
