'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle2 } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { BRAND_NAME, CONTACT_EMAIL, WEB3FORMS_KEY } from '@/lib/config'
import { cn } from '@/lib/utils'

interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
}

const inputClasses = cn(
  'w-full px-4 py-3 rounded-xl',
  'bg-(--bg-card) border border-(--border)',
  'text-(--text-primary) placeholder:text-(--text-muted)',
  'focus:outline-none focus:border-(--accent-primary)/50 focus:ring-1 focus:ring-(--accent-primary)/30',
  'transition-colors'
)

const errorClasses = 'text-(--danger) text-sm mt-1'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sendError, setSendError] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSendError(false)
    try {
      // FormData sin cabeceras propias: Web3Forms rechaza el preflight CORS que provoca application/json
      const body = new FormData()
      body.append('access_key', WEB3FORMS_KEY)
      body.append('from_name', `Portafolio ${BRAND_NAME}`)
      body.append('subject', data.subject?.trim() || `Nuevo mensaje de ${data.name} desde el portafolio`)
      body.append('name', data.name)
      body.append('email', data.email)
      body.append('message', data.message)
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body })
      const json: { success?: boolean } = await res.json()
      if (!res.ok || json.success === false) throw new Error('send failed')
      setSubmitted(true)
      reset()
    } catch {
      setSendError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionTitle
          title="¿Trabajamos juntos?"
          subtitle="Estoy disponible para proyectos freelance, colaboraciones y oportunidades laborales."
        />

        {/* Card del formulario */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-(--bg-card) border border-(--border) rounded-2xl p-8 shadow-lg"
        >
          {submitted ? (
            /* Estado de éxito */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4"
            >
              <CheckCircle2 className="h-16 w-16 text-(--success) mx-auto animate-bounce" />
              <h3 className="text-xl font-semibold text-(--text-primary)">
                ¡Mensaje enviado!
              </h3>
              <p className="text-(--text-muted)">
                Gracias por contactarme. Te responderé pronto.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-(--accent-primary) hover:underline text-sm font-medium cursor-pointer"
              >
                Enviar otro mensaje
              </button>
            </motion.div>
          ) : (
            /* Formulario */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              
              <div>
                <label className="block text-sm font-medium text-(--text-muted) mb-1.5">
                  Nombre *
                </label>
                <input
                  {...register('name', { required: 'El nombre es requerido' })}
                  placeholder="Tu nombre"
                  className={cn(inputClasses, errors.name && 'border-(--danger)/50 focus:border-(--danger)/50 focus:ring-(color:--danger)/20')}
                />
                {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-(--text-muted) mb-1.5">
                  Email *
                </label>
                <input
                  {...register('email', {
                    required: 'El email es requerido',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' }
                  })}
                  type="email"
                  placeholder="tu@email.com"
                  className={cn(inputClasses, errors.email && 'border-(--danger)/50 focus:border-(--danger)/50 focus:ring-(color:--danger)/20')}
                />
                {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-(--text-muted) mb-1.5">
                  Asunto
                </label>
                <input
                  {...register('subject')}
                  placeholder="¿En qué puedo ayudarte?"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-(--text-muted) mb-1.5">
                  Mensaje *
                </label>
                <textarea
                  {...register('message', { 
                    required: 'El mensaje es requerido', 
                    minLength: { value: 10, message: 'Mínimo 10 caracteres' } 
                  })}
                  rows={5}
                  placeholder="Cuéntame sobre tu proyecto..."
                  className={cn(inputClasses, 'resize-none', errors.message && 'border-(--danger)/50 focus:border-(--danger)/50 focus:ring-(color:--danger)/20')}
                />
                {errors.message && <p className={errorClasses}>{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-(--accent-primary) text-(--overlay-fg) font-semibold hover:bg-(--accent-primary-hover) transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-(color:--glow-indigo)/20"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-(--overlay-fg)/30 border-t-(--overlay-fg) rounded-full" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Enviar mensaje</span>
                  </>
                )}
              </button>

              {sendError && (
                <p role="alert" className="text-(--danger) text-sm text-center">
                  No se pudo enviar el mensaje.{' '}
                  {CONTACT_EMAIL ? (
                    <>Escríbeme directamente a <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.</>
                  ) : (
                    'Inténtalo de nuevo en unos minutos.'
                  )}
                </p>
              )}

            </form>
          )}
        </motion.div>

        {/* Links sociales */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4 mt-8"
        >
          <SocialLinks className="p-3 rounded-xl border border-(--border) text-(--text-muted) hover:text-(--text-primary) hover:border-(--accent-primary)/50 transition-colors bg-(--bg-card)/30" />
        </motion.div>

      </div>
    </section>
  )
}
