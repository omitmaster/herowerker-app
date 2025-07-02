import { ArrowUpRight, Building2, CreditCard, DollarSign, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gesamtumsatz</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% zum letzten Monat</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktive Projekte</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12</div>
              <p className="text-xs text-muted-foreground">+2 seit letzter Woche</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offene Rechnungen</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€12,450.00</div>
              <p className="text-xs text-muted-foreground">+19% zum letzten Monat</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Neue Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+8</div>
              <p className="text-xs text-muted-foreground">+3 diesen Monat</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Neueste Projekte</CardTitle>
                <CardDescription>Ein Überblick über Ihre aktuellsten Bauprojekte.</CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/construction">
                  Alle ansehen
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Projekt</TableHead>
                    <TableHead className="hidden xl:table-column">Typ</TableHead>
                    <TableHead className="hidden xl:table-column">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Budget</TableHead>
                    <TableHead className="text-right">Aktion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">EFH Neubau Familie Meier</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">Hamburg</div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">Neubau</TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        In Arbeit
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">€350,000.00</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Bürokomplex Vision One</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">München</div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">Gewerbe</TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="secondary">
                        Planung
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">€2,500,000.00</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Dachsanierung Altbau</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">Berlin</div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">Sanierung</TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="destructive">
                        Verzögert
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">€85,000.00</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Letzte Aktivitäten</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>MM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Max Mustermann</p>
                  <p className="text-sm text-muted-foreground">hat das Projekt 'EFH Neubau' auf 65% aktualisiert.</p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">vor 2h</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>EE</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Erika Elektra</p>
                  <p className="text-sm text-muted-foreground">hat einen neuen Kostenvoranschlag erstellt.</p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">vor 4h</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/03.png" alt="Avatar" />
                  <AvatarFallback>PM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Peter Maler</p>
                  <p className="text-sm text-muted-foreground">hat eine Materialbestellung abgeschlossen.</p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">vor 1 Tag</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
