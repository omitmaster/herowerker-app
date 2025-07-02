import Link from "next/link"
import { Home, Briefcase, FileText, Users, GanttChartSquare, Warehouse } from "lucide-react"
import { NavLink } from "./nav-link"

export function AppSidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Briefcase className="h-6 w-6" />
            <span>CloudCRM Pro</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavLink href="/dashboard">
              <Home className="h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink href="/construction">
              <GanttChartSquare className="h-4 w-4" />
              Bauprojekte
            </NavLink>
            <NavLink href="/tenders">
              <FileText className="h-4 w-4" />
              Ausschreibungen
            </NavLink>
            <NavLink href="/suppliers">
              <Users className="h-4 w-4" />
              Lieferanten
            </NavLink>
            <NavLink href="/warehouse">
              <Warehouse className="h-4 w-4" />
              Lager
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  )
}
