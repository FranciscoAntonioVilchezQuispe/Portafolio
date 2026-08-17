export type SkillColor =
  | 'indigo'
  | 'cyan'
  | 'violet'
  | 'emerald'
  | 'orange'
  | 'gray'
  | 'rose'
  | 'amber'

export interface SkillCategory {
  name: string
  color: SkillColor
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Mobile Development',
    color: 'indigo',
    skills: ['Android', 'Kotlin', 'Material 3', 'Jetpack Compose', 'Retrofit', 'Hilt', 'Coroutines'],
  },
  {
    name: 'Backend',
    color: 'cyan',
    skills: ['Python', 'FastAPI', 'Node.js', 'NestJS', 'Odoo 19', 'REST API', 'JSON-RPC'],
  },
  {
    name: 'Frontend',
    color: 'violet',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    name: 'Bases de Datos',
    color: 'emerald',
    skills: ['PostgreSQL', 'Oracle DB', 'MySQL', 'SQLite', 'DynamoDB'],
  },
  {
    name: 'Cloud & DevOps',
    color: 'orange',
    skills: ['AWS Lambda', 'Step Functions', 'S3', 'Docker', 'Docker Compose', 'Nginx', 'Vercel'],
  },
  {
    name: 'ERP',
    color: 'amber',
    skills: ['Odoo 19', 'Módulos Python', 'XML Views', 'QWeb', 'SUNAT/UBL 2.1'],
  },
  {
    name: 'Automatización & Scraping',
    color: 'rose',
    skills: ['C#', '.NET', 'Playwright', 'BeautifulSoup', 'Pandas', 'PowerShell'],
  },
  {
    name: 'Herramientas',
    color: 'gray',
    skills: ['Git', 'VS Code', 'IntelliJ IDEA', 'Android Studio', 'Postman', 'DBeaver'],
  },
]
