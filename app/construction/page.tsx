import { createClient } from "@/lib/supabase/server"
import ConstructionClientPage from "./client-page" // KORREKTUR: Import als default

export default async function ConstructionProjectsPage() {
  const supabase = createClient() // KORREKTUR: Aufruf ohne Argumente

  // Fetching data on the server
  const { data: projectsData, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false }) // Corrected syntax

  if (error) {
    console.error("Error fetching projects: ", error)
    // Return an error state or an empty array
    return <ConstructionClientPage initialProjects={[]} />
  }

  // Ensure projects is an array, even if data is null
  const projects = projectsData ?? []

  // Passing data to the client component
  return <ConstructionClientPage initialProjects={projects} />
}
