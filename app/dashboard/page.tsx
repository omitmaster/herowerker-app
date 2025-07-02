"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, User, FileText, Calendar } from "lucide-react"

export default function DashboardPage() {
  const recentProjects = [
    {
      id: 1,
      title: "Sophie Graichen Hansehaus Immobilienverwaltung",
      subtitle: "Hansehaus Immobilienverwaltung",
      time: "Gestern · 18:42",
      assignee: "Timo Brandt",
      status: "active",
    },
    {
      id: 2,
      title: "Thomas Bank 110,00 qm Hausrenovierung",
      subtitle: "Thomas Bank",
      time: "Gestern · 17:03",
      assignee: "Afrim Sinja",
      status: "urgent",
    },
    {
      id: 3,
      title: "Jan Thomen Malerarbeiten Haus Streichen 175,00 qm",
      subtitle: "UEBERKOPF GmbH Riggingservice & Veranstaltungstechnik",
      time: "Gestern · 16:24",
      assignee: "Timo Brandt",
      status: "active",
    },
    {
      id: 4,
      title: "Terrania AG Hauptverwaltung",
      subtitle: "Terrania AG Hauptverwaltung z.H Sebastian Krüger",
      time: "Mo., 30.06.2025 · 19:38",
      assignee: "Timo Brandt",
      status: "active",
    },
    {
      id: 5,
      title: "Angela Rohwer 10 Rahmen Altbau Holztürrahmen",
      subtitle: "Angela Rohwer",
      time: "Mo., 30.06.2025 · 19:06",
      assignee: "Timo Brandt",
      status: "active",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">Guten Morgen, Timo!</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Recently Edited Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Zuletzt bearbeitet</h2>

            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {project.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {project.assignee}
                    </div>
                    {project.status === "urgent" && <div className="h-2 w-2 rounded-full bg-red-500" />}
                    {project.status === "active" && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button variant="link" className="text-teal-600 hover:text-teal-700 p-0">
                Projekte anzeigen
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-100 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Letzte 90 Tage</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-900">8</span>
                    <span className="text-sm text-gray-600">Offene Rechnungen</span>
                  </div>
                </div>
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Offene Urlaubsanträge</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-900">0</span>
                    <span className="text-sm text-gray-600">Offene Urlaubsanträge</span>
                  </div>
                </div>
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
