"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Building2,
  Calendar,
  FileText,
  Clock,
  Database,
  Users,
  HelpCircle,
  UserPlus,
  MessageSquare,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Übersicht",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projekte",
    href: "/construction",
    icon: Building2,
  },
  {
    title: "Plantafel",
    href: "/planning",
    icon: Calendar,
  },
  {
    title: "Rechnungen",
    href: "/invoices",
    icon: FileText,
  },
  {
    title: "Zeiten",
    href: "/timetracking",
    icon: Clock,
  },
  {
    title: "Stammdaten",
    href: "/masterdata",
    icon: Database,
  },
  {
    title: "Kontakte",
    href: "/contacts",
    icon: Users,
  },
]

const bottomItems = [
  {
    title: "Hilfe bekommen",
    href: "/help",
    icon: HelpCircle,
    hasNotification: true,
  },
  {
    title: "Freunden empfehlen",
    href: "/referral",
    icon: UserPlus,
    hasNotification: true,
  },
  {
    title: "Feedback geben",
    href: "/feedback",
    icon: MessageSquare,
  },
  {
    title: "Einstellungen",
    href: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-[220px] flex-col bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-700">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-white text-black font-bold text-sm">
          CC
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm">CloudCRM Pro</span>
          <span className="text-xs text-gray-400">Verwaltungssystem</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-800",
                    isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:text-white",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-700 p-2">
        <ul className="space-y-1">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-800 relative",
                    isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:text-white",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                  {item.hasNotification && <div className="absolute right-2 h-2 w-2 rounded-full bg-red-500" />}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
