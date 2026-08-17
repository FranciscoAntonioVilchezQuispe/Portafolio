'use client'

import { motion } from 'framer-motion'
import { Code2, Layers, Globe, Cpu, MapPin } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { fadeInUp } from '@/lib/animations'

const stats = [
  { icon: Code2, value: '8+', label: 'Años de\nexperiencia' },
  { icon: Layers, value: '15+', label: 'Proyectos\nentregados' },
  { icon: Globe, value: '+5K', label: 'Documentos SUNAT/mes' },
  { icon: Cpu, value: 'Clean Code', label: 'Clean Arch + SOLID' },
]

export function About() {
  return (
    <section id="sobre-mi" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Sobre mí" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Columna izquierda — texto */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-4"
          >
            <p className="text-[--text-muted] text-lg leading-relaxed font-light">
              Soy un **Desarrollador Full Stack y Arquitecto de Software** con más de 8 años de trayectoria 
              diseñando e implementando soluciones empresariales críticas para los sectores de transporte, 
              tecnología y seguros. Especializado en el ecosistema **.NET (C#, ASP.NET, Blazor)** y **Node.js (NestJS)**.
            </p>
            <p className="text-[--text-muted] text-lg leading-relaxed font-light">
              Me apasiona resolver problemas complejos de negocio a través del código limpio, liderando la integración 
              de sistemas ERP con SAP (SOAP/REST), la migración de arquitecturas monolíticas hacia microservicios 
              (Clean Architecture / DDD), y la implementación de sistemas de facturación electrónica SUNAT (UBL 2.1).
            </p>
            <p className="text-[--text-muted] text-lg font-medium flex items-center gap-2">
              <MapPin size={18} className="text-[--accent-secondary] shadow-cyan-500/20" />
              Basado en Trujillo, Perú
            </p>
          </motion.div>

          {/* Columna derecha — stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={i * 0.1}
                className="glass-card rounded-xl p-6 text-center hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
              >
                <stat.icon className="h-6 w-6 text-[--accent-secondary] mx-auto mb-2" />
                <div className="text-3xl font-bold gradient-text whitespace-pre-line">
                  {stat.value}
                </div>
                <div className="text-[--text-muted] text-sm mt-1 whitespace-pre-line leading-snug">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
