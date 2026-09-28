import { Project } from '../types';

// app/lib/getProjectById.ts
export default async function getProjectById(id: string): Promise<Project | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}projects/${id}`, {
      cache: 'no-store', // or 'force-cache' / revalidate, depending on your needs
    });
    if (!res.ok) {
      console.error(`Failed to fetch project ${id}: ${res.status} ${res.statusText}`);
      return null;
    }
    const project: Project = await res.json();
    return project || null;
  } catch (error) {
    console.error(`Error fetching project by id ${id}:`, error);
    return null;
  }
}
