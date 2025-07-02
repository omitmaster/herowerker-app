import { AlertTriangle, Package, Mail, Upload, Star } from "lucide-react"
import { redirect } from "next/navigation"

// Mock data for preview
const mockData = {
  projects: [
    { id: 1, name: "EFH Neubau Familie Meier", status: "In Arbeit", progress: 65, budget: 350000, location: "Hamburg" },
    { id: 2, name: "Bürokomplex Vision One", status: "Planung", progress: 15, budget: 2500000, location: "München" },
    { id: 3, name: "Dachsanierung Altbau", status: "Verzögert", progress: 40, budget: 85000, location: "Berlin" },
  ],
  craftsmen: [
    { id: 1, name: "Max Maurer", trade: "Maurer", status: "Im Einsatz", hourlyRate: 55 },
    { id: 2, name: "Erika Elektra", trade: "Elektrikerin", status: "Verfügbar", hourlyRate: 68.5 },
    { id: 3, name: "Peter Maler", trade: "Maler", status: "Verfügbar", hourlyRate: 49 },
  ],
  estimates: [
    { id: 1, client: "Familie Schmidt", project: "Badezimmer Renovierung", value: 25000, status: "Offen" },
    { id: 2, client: "Müller GmbH", project: "Büroumbau", value: 85000, status: "Angenommen" },
    { id: 3, client: "City Immobilien", project: "Fassadensanierung", value: 150000, status: "In Bearbeitung" },
  ],
  recentActivities: [
    { id: 1, type: "project", message: "Projekt 'EFH Neubau' auf 65% aktualisiert", time: "vor 2 Stunden" },
    { id: 2, type: "estimate", message: "Kostenvoranschlag für Müller GmbH angenommen", time: "vor 4 Stunden" },
    { id: 3, type: "material", message: "Materialbestellung für Projekt #1 eingegangen", time: "vor 6 Stunden" },
  ],
}

// Kritische Benachrichtigungen und Alerts
const criticalAlerts = [
  {
    id: 1,
    type: "overdue_task",
    priority: "high",
    title: "Überfällige Aufgabe",
    message: "Abnahmeprotokoll für 'EFH Neubau Familie Meier' seit 3 Tagen überfällig",
    action: "Jetzt bearbeiten",
    actionUrl: "/construction/acceptance",
    icon: AlertTriangle,
    color: "destructive",
  },
  {
    id: 2,
    type: "low_stock",
    priority: "high",
    title: "Kritischer Lagerbestand",
    message: "Bewehrungsstahl BSt 500 S Ø12mm: Nur noch 8 Stangen verfügbar (Min: 15)",
    action: "Nachbestellen",
    actionUrl: "/warehouse/inventory",
    icon: Package,
    color: "destructive",
  },
  {
    id: 3,
    type: "important_email",
    priority: "medium",
    title: "Wichtige Kunden-E-Mail",
    message: "Dringende Nachfrage von Müller GmbH bezüglich Terminverschiebung",
    action: "E-Mail öffnen",
    actionUrl: "/customer-portal/chat",
    icon: Mail,
    color: "default",
  },
  {
    id: 4,
    type: "portal_upload",
    priority: "medium",
    title: "Neuer Upload im Kundenportal",
    message: "Familie Schmidt hat geänderte Baupläne hochgeladen",
    action: "Dokumente prüfen",
    actionUrl: "/customer-portal/documents",
    icon: Upload,
    color: "default",
  },
  {
    id: 5,
    type: "hot_lead",
    priority: "high",
    title: "Heißer Lead",
    message: "Premium-Lead: Luxusvilla Projekt (€2.8M) - Kontakt innerhalb 2h erforderlich",
    action: "Sofort anrufen",
    actionUrl: "/leads",
    icon: Star,
    color: "default",
  },
]

// Anstehende Termine
const upcomingAppointments = [
  {
    id: 1,
    title: "Baustellenbegehung Familie Meier",
    time: "Heute, 14:00",
    location: "Hamburg, Musterstraße 123",
    type: "inspection",
    priority: "high",
  },
  {
    id: 2,
    title: "Angebotspräsentation Müller GmbH",
    time: "Morgen, 10:30",
    location: "München, Bürokomplex",
    type: "presentation",
    priority: "medium",
  },
  {
    id: 3,
    title: "Materiallieferung Baustelle #3",
    time: "Freitag, 08:00",
    location: "Berlin, Altbau Sanierung",
    type: "delivery",
    priority: "medium",
  },
]

// Lagerbestand Übersicht
const inventoryOverview = [
  { name: "Zement Portland", current: 45, min: 20, status: "ok" },
  { name: "Bewehrungsstahl Ø12mm", current: 8, min: 15, status: "critical" },
  { name: "Dämmplatten XPS", current: 120, min: 30, status: "good" },
  { name: "Schrauben Spax 6x80mm", current: 2, min: 10, status: "critical" },
]

const summaryData = {
  activeProjects: 12,
  openTenders: 4,
  newLeads: 8,
}

const myTasks = [
  {
    id: 1,
    title: "Angebot für Projekt 'Neubau Halle 5' fertigstellen",
    priority: "hoch",
    dueDate: "2025-07-05",
    project: "Neubau Halle 5",
  },
  {
    id: 2,
    title: "GAEB-Datei von 'Schmidt GmbH' prüfen",
    priority: "mittel",
    dueDate: "2025-07-03",
    project: "Sanierung Bürogebäude",
  },
  {
    id: 3,
    title: "Material für Baustelle 'Müller' bestellen",
    priority: "niedrig",
    dueDate: "2025-07-08",
    project: "EFH Müller",
  },
]

const recentActivities = [
  {
    id: 1,
    user: "Max Mustermann",
    action: "hat das Projekt",
    target: "Neubau Halle 5",
    time: "vor 15 Minuten",
    type: "projekt",
  },
  {
    id: 2,
    user: "System",
    action: "hat eine neue Ausschreibung importiert:",
    target: "D83-Fassade.gaeb",
    time: "vor 1 Stunde",
    type: "ausschreibung",
  },
  {
    id: 3,
    user: "Erika Mustermann",
    action: "hat den Lieferanten",
    target: "Baustoff AG",
    action_cont: "hinzugefügt",
    time: "vor 3 Stunden",
    type: "lieferant",
  },
]

/**
 * The root page of the application.
 * This page automatically redirects the user to the login page.
 */
export default function HomePage() {
  // Trigger a redirect to the login page.
  redirect("/login")
}
