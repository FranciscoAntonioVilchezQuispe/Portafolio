'use client'

import { motion } from 'framer-motion'
import { skillCategories } from '@/data/skills'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SkillBadge } from '@/components/ui/SkillBadge'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
}

export function Skills() {
  return (
    <section id="habilidades" className="py-24 bg-(--bg-surface)">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionTitle
          title="Habilidades"
          subtitle="Tecnologías y herramientas con las que trabajo"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map(category => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              className="space-y-3"
            >
              <h3 className="font-semibold text-(--text-primary) text-base">
                {category.name}
              </h3>
              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-2"
              >
                {category.skills.map(skill => (
                  <motion.div key={skill} variants={badgeVariants}>
                    <SkillBadge tech={skill} color={category.color} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
