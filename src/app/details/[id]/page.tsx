import React from 'react'
import ProjectDetailsClient from '../../../components/ProjectDetailsClient'
import getProjectById from '../../../lib/getProjectById'

interface PageProps {
  params: { id: string } | Promise<{ id: string }>
}

export default async function ProjectDetails({ params }: PageProps) {
  const resolvedParams = await params
  const { id } = resolvedParams
  const project = await getProjectById(id)

  return <ProjectDetailsClient project={project} />
}
