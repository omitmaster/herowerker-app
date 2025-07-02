"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Home, Building2, FileText, Users, PanelLeft, Package2, GanttChartSquare, Clock, Database } from "lucide-react"
import Link from "next/link"
import { UserNav } from "./user-nav"

const mobileNav = [
  { href: "/dashboard", icon: Home, label: "Übersicht" },
  { href: "/construction", icon: Building2, label: "Projekte" },
  { href: "/planning", icon: GanttChartSquare, label: "Plantafel" },
  { href: "/invoices", icon: FileText, label: "Rechnungen" },
  { href: "/timetracking", icon: Clock, label: "Zeiten" },
  { href: "/masterdata", icon: Database, label: "Stammdaten" },
  { href: "/contacts", icon: Users, label: "Kontakte" },
]

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden bg-transparent">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Navigation umschalten</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">CloudCRM Pro</span>
            </Link>
            {mobileNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="relative ml-auto flex-1 md:grow-0">{/* Search can go here */}</div>
      <UserNav />
    </header>
  )
}
