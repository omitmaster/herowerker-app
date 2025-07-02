import { createClient } from "@/lib/supabase/server"
import ConstructionClientPage from "./client-page"
import type { Project } from "@/types/project"

export default async function ConstructionProjectsPage() {
  const supabase = createClient()

  const { data: projectsData, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects: ", error)
    // Render the page with an empty array in case of error
    return <ConstructionClientPage initialProjects={[]} />
  }

  const projects = (projectsData as Project[]) ?? []

  return <ConstructionClientPage initialProjects={projects} />
}
