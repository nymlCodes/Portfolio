'use server';

import { Project } from '../types';

const getProjects = async (): Promise<Project[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}projects`, {
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
