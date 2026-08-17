'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, Download, ArrowRight } from 'lucide-react'
import { BRAND_NAME, AVAILABLE } from '@/lib/config'
import { fadeInUp } from '@/lib/animations'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-16">
      {/* Blobs decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[--accent-primary]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[--accent-secondary]/10 rounded-full blur-3xl" />
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna Izquierda: Información */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            
            {/* Badge de disponibilidad */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0}>
              {AVAILABLE && (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  Disponible para proyectos
                </span>
              )}
            </motion.div>

            {/* Saludo + nombre */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0.1} className="space-y-2">
              <p className="text-[--text-muted] text-lg font-medium">Hola, soy</p>
              <h1 className="font-mono text-5xl md:text-7xl font-bold gradient-text pb-1">
                {BRAND_NAME}
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-[--text-primary] font-bold tracking-tight uppercase mt-2">
                Building Innovative Software Solutions.
              </h2>
            </motion.div>

            {/* Descripción */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-[--text-muted] text-lg max-w-2xl leading-relaxed"
            >
              Ingeniero de Software Full-Stack enfocado en soluciones corporativas robustas. 
              Especializado en microservicios (.NET 8, FastAPI), ecosistemas ERP (Odoo 19), 
              aplicaciones móviles nativas (Kotlin) e integraciones seguras en la nube.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#proyectos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[--accent-primary] to-[--accent-secondary] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
              >
                Explorar Proyectos
                <ArrowRight size={16} />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-500/30 text-[--accent-secondary] hover:text-white hover:bg-cyan-500/10 transition-colors font-semibold bg-cyan-500/5 shadow-md shadow-cyan-500/5"
              >
                Contáctame
              </a>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[--border] text-[--text-muted] hover:text-[--text-primary] hover:border-[--accent-primary]/50 transition-colors font-medium bg-[--bg-surface]/50"
              >
                <Download size={16} />
                Descargar CV
              </a>
            </motion.div>

          </div>

          {/* Columna Derecha: Avatar de Neón con Foto de Perfil */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
            >
              {/* Anillo de neón con gradiente de bordes */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[--accent-primary] to-[--accent-secondary] p-[3px] animate-[spin_12s_linear_infinite] opacity-85 blur-[0.5px]" />
              <div className="absolute inset-0.5 rounded-full bg-[--bg-primary] flex items-center justify-center overflow-hidden z-10">
                <Image
                  src="/profile.webp"
                  alt={BRAND_NAME}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 256px, 320px"
                  priority
                  unoptimized
                />
              </div>
              {/* Glow en background */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[--accent-primary] to-[--accent-secondary] opacity-10 blur-3xl -z-10" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[--text-muted]"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}
