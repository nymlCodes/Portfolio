'use server';

const getProjects = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}projects`);
  const projects = await res.json();

  return projects || null;
};

export default getProjects;