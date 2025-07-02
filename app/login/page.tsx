import { login, signup } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage({ searchParams }: { searchParams: { message: string } }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Geben Sie Ihre E-Mail-Adresse ein, um sich anzumelden.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Passwort</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {searchParams.message && <div className="text-sm font-medium text-destructive">{searchParams.message}</div>}
            <Button formAction={login} className="w-full">
              Anmelden
            </Button>
            <Button formAction={signup} variant="outline" className="w-full bg-transparent">
              Registrieren
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
