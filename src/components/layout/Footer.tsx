import { Mail } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/icons'
import { BRAND_NAME, SOCIAL, CONTACT_EMAIL } from '@/lib/config'

export function Footer() {
  return (
    <footer className="bg-[--bg-surface] border-t border-[--border] py-8 mt-24 theme-transition">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[--text-muted] hover:text-[--text-primary] hover:bg-[--bg-card] transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[--text-muted] hover:text-[--text-primary] hover:bg-[--bg-card] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            {CONTACT_EMAIL && (
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="p-2 rounded-lg text-[--text-muted] hover:text-[--text-primary] hover:bg-[--bg-card] transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            )}
          </div>

          {/* Copyright text */}
          <p className="text-[--text-muted] text-sm text-center">
            <span className="font-mono text-[--accent-primary] font-bold">{BRAND_NAME}</span>
            {' · '}
            Hecho con Next.js desde Lima, Perú
            {' · '}
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
