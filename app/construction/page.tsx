import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { ConstructionClientPage } from "./client-page"
import type { Project } from "@/types/project"

export default async function ConstructionProjectsPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Fetching data on the server
  const { data: projectsData, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects: ", error)
    // Return an error state or an empty array
    return <ConstructionClientPage initialProjects={[]} />
  }

  // Ensure projects is an array, even if data is null
  const projects = (projectsData as Project[]) ?? []

  // Passing data to the client component
  return <ConstructionClientPage initialProjects={projects} />
}
