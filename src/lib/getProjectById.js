// app/lib/getProjectById.js
export default async function getProjectById(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}projects/${id}`, {
      cache: 'no-store', // or 'force-cache' / revalidate, depending on your needs
    })
    if (!res.ok) {
      console.error(`Failed to fetch project ${id}: ${res.status} ${res.statusText}`);
      return null;
    }
    const project = await res.json()
    return project || null
  } catch (error) {
    console.error(`Error fetching project by id ${id}:`, error);
    return null
  }
}