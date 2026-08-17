'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn('text-center mb-12', className)}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[--text-muted] text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
