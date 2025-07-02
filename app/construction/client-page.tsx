"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Pencil } from "lucide-react"
import { saveProject } from "./actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Project } from "@/types/project"
import { useActionState } from "@/hooks/useActionState" // Import useActionState hook

const initialState = {
  message: "",
  success: false,
}

export default function ConstructionClientPage({ initialProjects }: { initialProjects: Project[] }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const [state, formAction, isPending] = useActionState(saveProject, initialState)

  useEffect(() => {
    if (state?.success) {
      setIsDialogOpen(false)
    }
  }, [state])

  const handleCreateNew = () => {
    setEditingProject(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsDialogOpen(true)
  }

  const projectStatusOptions = ["Geplant", "In Arbeit", "Pausiert", "Abgeschlossen", "Abgesagt"]

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Bauprojekte</h1>
        <Button className="ml-auto" onClick={handleCreateNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Neues Projekt anlegen
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form action={formAction} key={editingProject?.id ?? "new"}>
            {editingProject && <input type="hidden" name="id" value={editingProject.id} />}
            <DialogHeader>
              <DialogTitle>{editingProject ? "Projekt bearbeiten" : "Neues Projekt anlegen"}</DialogTitle>
              <DialogDescription>
                {editingProject
                  ? "Ändern Sie die Details Ihres Projekts."
                  : "Füllen Sie die Details für Ihr neues Bauprojekt aus."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Projektname
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  defaultValue={editingProject?.name ?? ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Beschreibung
                </Label>
                <Input
                  id="description"
                  name="description"
                  defaultValue={editingProject?.description ?? ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select name="status" defaultValue={editingProject?.status ?? "Geplant"}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Status auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectStatusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start_date" className="text-right">
                  Startdatum
                </Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  defaultValue={editingProject?.start_date?.split("T")[0] ?? ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end_date" className="text-right">
                  Enddatum
                </Label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  defaultValue={editingProject?.end_date?.split("T")[0] ?? ""}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Wird gespeichert..." : "Projekt speichern"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Ihre Projekte</CardTitle>
          <CardDescription>Hier werden alle Ihre laufenden und abgeschlossenen Bauprojekte angezeigt.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projektname</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Startdatum</TableHead>
                  <TableHead>Enddatum</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialProjects && initialProjects.length > 0 ? (
                  initialProjects.map((project: Project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>
                        <Badge>{project.status}</Badge>
                      </TableCell>
                      <TableCell>
                        {project.start_date ? new Date(project.start_date).toLocaleDateString("de-DE") : "-"}
                      </TableCell>
                      <TableCell>
                        {project.end_date ? new Date(project.end_date).toLocaleDateString("de-DE") : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Bearbeiten</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Sie haben noch keine Projekte angelegt.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
