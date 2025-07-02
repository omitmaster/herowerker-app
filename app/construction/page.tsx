"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"
import {
  Building2,
  CalendarIcon,
  Users,
  DollarSign,
  FileText,
  MessageSquare,
  AlertTriangle,
  Plus,
  Target,
  TrendingUp,
  BarChart3,
  Kanban,
  Clock,
  ArrowRight,
} from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbLink } from "@/components/ui/breadcrumb"
import Link from "next/link"

// Mock Data für die Übersicht
const mockStats = {
  totalProjects: 12,
  activeProjects: 8,
  completedProjects: 4,
  totalBudget: 5250000,
  spentBudget: 2100000,
  teamMembers: 24,
  pendingTasks: 47,
  upcomingDeadlines: 6,
}

const constructionModules = [
  {
    title: "Projektübersicht",
    description: "Alle wichtigen KPIs und Projektdetails auf einen Blick",
    icon: Building2,
    href: "/construction/projects",
    color: "bg-blue-500",
    stats: `${mockStats.activeProjects} aktive Projekte`,
  },
  {
    title: "Kanban-Board",
    description: "Aufgabenverwaltung mit Drag & Drop-Funktionalität",
    icon: Kanban,
    href: "/construction/kanban",
    color: "bg-purple-500",
    stats: `${mockStats.pendingTasks} offene Aufgaben`,
  },
  {
    title: "Kalender-Integration",
    description: "Termine, Meilensteine und Deadlines verwalten",
    icon: CalendarIcon,
    href: "/construction/calendar",
    color: "bg-green-500",
    stats: `${mockStats.upcomingDeadlines} anstehende Termine`,
  },
  {
    title: "Team-Management",
    description: "Mitarbeiterzuweisung und Kommunikation",
    icon: Users,
    href: "/construction/team",
    color: "bg-orange-500",
    stats: `${mockStats.teamMembers} Teammitglieder`,
  },
  {
    title: "Budget-Tracking",
    description: "Echtzeit-Kostenüberwachung und Finanzplanung",
    icon: DollarSign,
    href: "/construction/budget",
    color: "bg-teal-500",
    stats: `€${(mockStats.spentBudget / 1000000).toFixed(1)}M von €${(mockStats.totalBudget / 1000000).toFixed(1)}M`,
  },
  {
    title: "Risikomanagement",
    description: "Proaktive Problemerkennung und -lösung",
    icon: AlertTriangle,
    href: "/construction/risks",
    color: "bg-yellow-500",
    stats: "3 aktive Risiken",
  },
  {
    title: "Dokumentenverwaltung",
    description: "Zentrale Ablage aller Projektdateien",
    icon: FileText,
    href: "/construction/documents",
    color: "bg-indigo-500",
    stats: "156 Dokumente",
  },
  {
    title: "Projekt-Chat",
    description: "Direkte Kommunikation im Team",
    icon: MessageSquare,
    href: "/construction/chat",
    color: "bg-pink-500",
    stats: "12 aktive Chats",
  },
  {
    title: "Fortschritts-Tracking",
    description: "Visuelle Darstellung des Projektfortschritts",
    icon: TrendingUp,
    href: "/construction/progress",
    color: "bg-red-500",
    stats: "Ø 67% Fortschritt",
  },
]

export default function ConstructionOverviewPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Baustellenverwaltung</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Baustellenverwaltung</h1>
              <p className="text-xl text-muted-foreground mt-2">
                Vollständiges Projektmanagement für alle Ihre Bauprojekte
              </p>
            </div>
            <div className="flex gap-3">
              <Button size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Neues Projekt
              </Button>
              <Button variant="outline" size="lg">
                <BarChart3 className="mr-2 h-5 w-5" />
                Berichte
              </Button>
            </div>
          </div>

          {/* Schnellstatistiken */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Aktive Projekte</p>
                    <p className="text-3xl font-bold">{mockStats.activeProjects}</p>
                    <p className="text-xs text-muted-foreground mt-1">von {mockStats.totalProjects} Gesamtprojekten</p>
                  </div>
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Gesamtbudget</p>
                    <p className="text-3xl font-bold">€{(mockStats.totalBudget / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      €{(mockStats.spentBudget / 1000000).toFixed(1)}M verbraucht
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Team</p>
                    <p className="text-3xl font-bold">{mockStats.teamMembers}</p>
                    <p className="text-xs text-muted-foreground mt-1">Aktive Mitarbeiter</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Offene Aufgaben</p>
                    <p className="text-3xl font-bold">{mockStats.pendingTasks}</p>
                    <p className="text-xs text-muted-foreground mt-1">{mockStats.upcomingDeadlines} mit Deadline</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hauptmodule */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Projektmanagement-Module</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {constructionModules.map((module) => (
                <Link key={module.title} href={module.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-lg ${module.color} text-white`}>
                          <module.icon className="h-6 w-6" />
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                      <CardDescription className="text-base">{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-sm">
                          {module.stats}
                        </Badge>
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          Öffnen →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Schnellzugriff */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Aktuelle Prioritäten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="flex-1">
                      <p className="font-medium">EFH Neubau - Rohbau Abnahme</p>
                      <p className="text-sm text-muted-foreground">Fällig: Morgen</p>
                    </div>
                    <Badge variant="destructive">Hoch</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="flex-1">
                      <p className="font-medium">Bürokomplex - Genehmigungen</p>
                      <p className="text-sm text-muted-foreground">Fällig: Diese Woche</p>
                    </div>
                    <Badge variant="secondary">Mittel</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <p className="font-medium">Materialbestellung Projekt #3</p>
                      <p className="text-sm text-muted-foreground">Fällig: Nächste Woche</p>
                    </div>
                    <Badge variant="outline">Normal</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Leistungsübersicht
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Projektfortschritt (Durchschnitt)</span>
                    <span className="font-bold">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "67%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Budget-Auslastung</span>
                    <span className="font-bold">40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "40%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Team-Auslastung</span>
                    <span className="font-bold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bauprojekte */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold md:text-2xl">Bauprojekte</h1>
              <Button className="ml-auto gap-1">
                <PlusCircle className="h-4 w-4" />
                Neues Projekt
              </Button>
            </div>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Ihre Projekte</CardTitle>
                <CardDescription>
                  Hier werden alle Ihre laufenden und abgeschlossenen Bauprojekte angezeigt.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-12">
                  <p>Sie haben noch keine Projekte angelegt.</p>
                  <p>Klicken Sie oben rechts auf "Neues Projekt", um zu starten.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
