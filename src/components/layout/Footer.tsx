import { SocialLinks } from '@/components/ui/SocialLinks'
import { BRAND_NAME } from '@/lib/config'

export function Footer() {
  return (
    <footer className="bg-(--bg-surface) border-t border-(--border) py-8 mt-24 theme-transition">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <SocialLinks className="p-2 rounded-lg text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-card) transition-colors" />
          </div>

          {/* Copyright text */}
          <p className="text-(--text-muted) text-sm text-center">
            <span className="font-mono text-(--accent-primary) font-bold">{BRAND_NAME}</span>
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
