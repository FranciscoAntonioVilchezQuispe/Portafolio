import { Mail } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/icons'
import { SOCIAL, CONTACT_EMAIL } from '@/lib/config'

interface SocialLinksProps {
  className?: string
  iconSize?: number
}

export function SocialLinks({ className, iconSize = 20 }: SocialLinksProps) {
  return (
    <>
      <a
        href={SOCIAL.github}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label="GitHub"
      >
        <Github size={iconSize} />
      </a>
      <a
        href={SOCIAL.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label="LinkedIn"
      >
        <Linkedin size={iconSize} />
      </a>
      {CONTACT_EMAIL && (
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className={className}
          aria-label="Email"
        >
          <Mail size={iconSize} />
        </a>
      )}
    </>
  )
}
