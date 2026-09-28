'use server';

import { Project } from '../types';

const getProjects = async (): Promise<Project[]> => {
  try {
    const rawServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
    const baseUrl = rawServerUrl ? rawServerUrl.replace(/\/+$/, '') : '';
    const endpoint = baseUrl ? `${baseUrl}/projects` : '/projects';

    const res = await fetch(endpoint, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
      return [];
    }

    const projects: Project[] = await res.json();
    return projects || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export default getProjects;
