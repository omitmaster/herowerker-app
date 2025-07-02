import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

// Vereinfachte WAF-Prüfung ohne Datenbankzugriff für Preview
function simpleWAFCheck(request: NextRequest): {
  action: "block" | "allow" | "challenge"
  reason: string
  riskScore: number
} {
  const url = request.url
  const userAgent = request.headers.get("user-agent") || ""
  const method = request.method

  // Einfache Pattern-basierte Prüfungen
  const sqlPatterns = ["union select", "drop table", "1=1", "or 1=1", "'", '"', ";--"]
  const xssPatterns = ["<script", "javascript:", "onload=", "alert("]
  const cmdPatterns = ["; cat", "; rm", "$(", "`", "&&"]

  let riskScore = 0
  const reason = "Request allowed"

  // SQL Injection Check
  for (const pattern of sqlPatterns) {
    if (url.toLowerCase().includes(pattern)) {
      return {
        action: "block",
        reason: `SQL Injection pattern detected: ${pattern}`,
        riskScore: 95,
      }
    }
  }

  // XSS Check
  for (const pattern of xssPatterns) {
    if (url.toLowerCase().includes(pattern)) {
      return {
        action: "block",
        reason: `XSS pattern detected: ${pattern}`,
        riskScore: 85,
      }
    }
  }

  // Command Injection Check
  for (const pattern of cmdPatterns) {
    if (url.toLowerCase().includes(pattern)) {
      return {
        action: "block",
        reason: `Command injection pattern detected: ${pattern}`,
        riskScore: 90,
      }
    }
  }

  // Bot Detection (einfach)
  const botPatterns = ["bot", "crawler", "spider", "scraper", "curl", "wget", "python"]
  for (const pattern of botPatterns) {
    if (userAgent.toLowerCase().includes(pattern)) {
      riskScore += 30
      if (userAgent.toLowerCase().includes("malicious") || userAgent.toLowerCase().includes("attack")) {
        return {
          action: "block",
          reason: "Malicious bot detected",
          riskScore: 80,
        }
      }
    }
  }

  // Rate Limiting (sehr einfach - nur für Demo)
  if (method === "POST" && url.includes("/api/")) {
    riskScore += 10
  }

  return {
    action: riskScore > 70 ? "challenge" : "allow",
    reason: riskScore > 70 ? "High risk score detected" : "Request allowed",
    riskScore,
  }
}

export async function middleware(request: NextRequest) {
  // This will refresh the session cookie if it's expired.
  // It's a good practice to handle potential errors from updateSession.
  try {
    const sessionResponse = await updateSession(request)
    if (sessionResponse) {
      return sessionResponse
    }
  } catch (e) {
    console.error("Middleware error:", e)
    // If the middleware fails, we pass the request through without modification.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }

  // Skip WAF für statische Assets und Next.js interne Routen
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/_next/") ||
    (pathname.includes(".") && !pathname.includes("/api/")) ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }

  try {
    // Verwende vereinfachte WAF-Prüfung für Preview-Umgebung
    const wafResult = simpleWAFCheck(request)

    // Log für Debugging
    console.log(`WAF Check: ${pathname} - Action: ${wafResult.action}, Risk: ${wafResult.riskScore}`)

    switch (wafResult.action) {
      case "block":
        return new NextResponse(
          JSON.stringify({
            error: "Request blocked by WAF",
            reason: wafResult.reason,
            risk_score: wafResult.riskScore,
            request_id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          }),
          {
            status: 403,
            headers: {
              "Content-Type": "application/json",
              "X-WAF-Action": "blocked",
              "X-WAF-Risk-Score": wafResult.riskScore.toString(),
            },
          },
        )

      case "challenge":
        return new NextResponse(
          JSON.stringify({
            challenge: "Please complete the security challenge",
            reason: wafResult.reason,
            risk_score: wafResult.riskScore,
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "X-WAF-Action": "challenge",
              "X-WAF-Risk-Score": wafResult.riskScore.toString(),
              "Retry-After": "60",
            },
          },
        )

      case "allow":
      default:
        // Request wird normal weitergeleitet
        const response = NextResponse.next()
        response.headers.set("X-WAF-Action", "allowed")
        response.headers.set("X-WAF-Risk-Score", wafResult.riskScore.toString())
        return response
    }
  } catch (error) {
    console.error("WAF Middleware Error:", error)
    // Bei Fehlern wird der Request durchgelassen
    const response = NextResponse.next()
    response.headers.set("X-WAF-Action", "error-fallback")
    response.headers.set("X-WAF-Error", "true")
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
