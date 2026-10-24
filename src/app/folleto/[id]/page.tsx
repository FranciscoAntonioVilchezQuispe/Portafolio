import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import { ProjectBrochure } from '@/components/ui/ProjectBrochure'

interface BrochurePageProps {
  params: Promise<{ id: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: BrochurePageProps): Promise<Metadata> {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  return {
    title: project ? `Folleto — ${project.title}` : 'Folleto',
    robots: { index: false, follow: true },
  }
}

export default async function BrochurePage({ params }: BrochurePageProps) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()

  return (
    <div className="pt-24 pb-12 print:p-0 flex justify-center">
      <ProjectBrochure project={project} className="shadow-2xl print:shadow-none" />
    </div>
  )
}
