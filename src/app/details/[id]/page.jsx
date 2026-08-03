import ProjectDetailsClient from '../../../components/ProjectDetailsClient'
import getProjectById from '../../../lib/getProjectById'

export default async function ProjectDetails({ params }) {
  const { id } = (await params)
  const project = await getProjectById(id)

  return <ProjectDetailsClient project={project} />
}