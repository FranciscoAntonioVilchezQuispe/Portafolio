import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { BRAND_NAME, LOCATION } from '@/lib/config'
import { projects } from '@/data/projects'

export const alt = `${BRAND_NAME} — Desarrollador de Software`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const stack = ['Android · Kotlin', 'Java Spring Boot', 'Python · Odoo', 'React', 'FastAPI', '.NET']

// Satori no entiende var(--x): se leen los tokens hex del :root de globals.css para no duplicar la paleta
async function readTokens() {
  const css = await readFile(join(process.cwd(), 'src/app/globals.css'), 'utf-8')
  const root = css.slice(css.indexOf(':root'), css.indexOf('}', css.indexOf(':root')))
  const token = (name: string) => root.match(new RegExp(String.raw`--${name}:\s*(#[0-9a-fA-F]{3,8})`))?.[1] ?? ''
  return {
    bg: token('bg-primary'),
    surface: token('bg-surface'),
    primary: token('accent-primary'),
    secondary: token('accent-secondary'),
    text: token('text-primary'),
    muted: token('text-muted'),
  }
}

export default async function OpengraphImage() {
  const c = await readTokens()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: `linear-gradient(135deg, ${c.bg} 0%, ${c.surface} 100%)`,
          color: c.text,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 28, color: c.secondary, letterSpacing: 2 }}>
            PORTAFOLIO · {LOCATION.toUpperCase()}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              fontWeight: 700,
              marginTop: 20,
              backgroundImage: `linear-gradient(90deg, ${c.primary}, ${c.secondary})`,
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {BRAND_NAME}
          </div>
          <div style={{ display: 'flex', fontSize: 40, marginTop: 12 }}>Desarrollador de Software Full-Stack</div>
          <div style={{ display: 'flex', fontSize: 28, color: c.muted, marginTop: 20 }}>
            {`${projects.length} proyectos reales: ERP, facturación electrónica SUNAT, apps móviles e IA`}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {stack.map((tech) => (
            <div
              key={tech}
              style={{
                display: 'flex',
                fontSize: 21,
                padding: '8px 18px',
                borderRadius: 999,
                border: `2px solid ${c.primary}`,
                color: c.text,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
