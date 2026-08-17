export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' as const },
  }),
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
