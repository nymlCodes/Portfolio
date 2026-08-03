'use server';

const getProjects = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}projects`);
    if (!res.ok) {
      console.error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
      return [];
    }
    const projects = await res.json();
    return projects || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export default getProjects;