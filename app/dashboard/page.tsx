import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, FileText, Users, GanttChartSquare } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const kpiData = [
    { title: "Aktive Projekte", value: "12", change: "+2 seit letzter Woche", icon: Building2 },
    { title: "Offene Rechnungen", value: "8", change: "€12.4k fällig", icon: FileText },
    { title: "Neue Kunden", value: "3", change: "+1 diesen Monat", icon: Users },
    { title: "Anstehende Aufgaben", value: "24", change: "5 überfällig", icon: GanttChartSquare },
  ]

  const recentProjects = [
    { id: "1", name: "EFH Neubau Familie Meier", status: "In Arbeit", budget: 85000 },
    { id: "2", name: "Bürokomplex Vision One", status: "Planung", budget: 250000 },
    { id: "3", name: "Dachsanierung Altbau", status: "Abgeschlossen", budget: 25000 },
  ]

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardDescription>{kpi.title}</CardDescription>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-4xl">{kpi.value}</CardTitle>
              <div className="text-xs text-muted-foreground">{kpi.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Neueste Projekte</CardTitle>
          <CardDescription>Ein Überblick über Ihre aktuellsten Bauprojekte.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projekt</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Budget</TableHead>
                <TableHead className="text-right">Aktion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="font-medium">{project.name}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant={project.status === "Abgeschlossen" ? "secondary" : "default"}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(project.budget)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/construction/${project.id}`}>
                      <Button variant="default">Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
