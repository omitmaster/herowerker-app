"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

// Diese eine Aktion handhabt das Erstellen UND Aktualisieren
export async function saveProject(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.auth.getUser()
  const user = data?.user

  if (!user) {
    return { success: false, message: "Nicht authentifiziert" }
  }

  const id = formData.get("id") as string | null
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const startDate = formData.get("start_date") as string
  const endDate = formData.get("end_date") as string
  const status = formData.get("status") as string

  if (!name || !status) {
    return { success: false, message: "Projektname und Status sind erforderlich." }
  }

  const projectData = {
    name,
    description,
    status,
    start_date: startDate || null,
    end_date: endDate || null,
    user_id: user.id,
  }

  let error

  if (id) {
    // Bestehendes Projekt aktualisieren
    const { error: updateError } = await supabase.from("projects").update(projectData).eq("id", id)
    error = updateError
  } else {
    // Neues Projekt erstellen
    const { error: insertError } = await supabase.from("projects").insert(projectData)
    error = insertError
  }

  if (error) {
    console.error("Error saving project:", error)
    return { success: false, message: "Fehler beim Speichern des Projekts." }
  }

  revalidatePath("/construction")
  return { success: true, message: `Projekt erfolgreich ${id ? "aktualisiert" : "erstellt"}.` }
}
