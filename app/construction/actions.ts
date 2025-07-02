"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function createProject(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Nicht authentifiziert" }
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const startDate = formData.get("start_date") as string
  const endDate = formData.get("end_date") as string

  if (!name) {
    return { success: false, message: "Projektname ist erforderlich" }
  }

  const { error } = await supabase.from("projects").insert({
    name,
    description,
    start_date: startDate || null,
    end_date: endDate || null,
    user_id: user.id,
    status: "Geplant", // Default status
  })

  if (error) {
    console.error("Error creating project:", error)
    return { success: false, message: "Fehler beim Erstellen des Projekts." }
  }

  revalidatePath("/construction") // This will refresh the project list automatically
  return { success: true, message: "Projekt erfolgreich erstellt." }
}
