import getProjects from '../lib/projects'
import ProjectsClient from './ProjectsClient'

export default async function Projects() {
  const projects = await getProjects()
  // console.log(projects);
  

  return <ProjectsClient projects={projects} />
}