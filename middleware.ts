import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Allow access to login page and API routes
    if (req.nextUrl.pathname.startsWith('/admin/login') || 
        req.nextUrl.pathname.startsWith('/api/auth')) {
      return NextResponse.next()
    }

    // Protect admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page and API routes
        if (req.nextUrl.pathname.startsWith('/admin/login') || 
            req.nextUrl.pathname.startsWith('/api/auth')) {
          return true
        }

        // Protect admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token
        }

        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*']
}
