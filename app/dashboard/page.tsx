import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { logout } from "@/app/auth/actions"

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Willkommen zurück!</CardTitle>
          <CardDescription>Sie sind angemeldet als: {user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Das System ist bereit. Von hier aus können wir die weiteren Module wieder hinzufügen.</p>
          <form action={logout}>
            <Button variant="outline" className="mt-4 bg-transparent">
              Abmelden
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
