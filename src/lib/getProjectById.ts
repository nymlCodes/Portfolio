import { Project } from '../types';

// app/lib/getProjectById.ts
export default async function getProjectById(id: string): Promise<Project | null> {
  try {
    const rawServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
    const baseUrl = rawServerUrl ? rawServerUrl.replace(/\/+$/, '') : '';
    const endpoint = baseUrl ? `${baseUrl}/projects/${id}` : `/projects/${id}`;

    const res = await fetch(endpoint, {
      cache: 'no-store',
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
