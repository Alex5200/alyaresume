import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const { token } = req.nextauth

    // Allow public access to login page
    if (pathname === '/admin/login' || pathname.startsWith('/api/auth')) {
      return NextResponse.next()
    }

    // If not authenticated and trying to access admin, redirect to login
    if (!token && pathname.startsWith('/admin')) {
      const loginUrl = new URL('/admin/login', req.url)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Public routes
        if (req.nextUrl.pathname === '/admin/login' || 
            req.nextUrl.pathname.startsWith('/api/auth')) {
          return true
        }
        // Admin requires token
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token
        }
        return true
      },
    },
    pages: {
      signIn: '/admin/login',
      error: '/admin/login',
    }
  }
)

export const config = {
  matcher: ['/admin/:path*']
}
