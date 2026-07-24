// app/lib/getProjectById.js
export default async function getProjectById(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}projects/${id}`, {
    cache: 'no-store', // or 'force-cache' / revalidate, depending on your needs
  })
  const project = await res.json()

  return project || null
}