import { getServerSession } from "next-auth/next"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Add your email validation logic here
      const allowedEmails = process.env.ADMIN_EMAILS?.split(',') || []
      
      if (allowedEmails.length === 0) {
        // If no admin emails are set, allow any email (for development)
        return true
      }
      
      return allowedEmails.includes(user.email || '')
    },
    async redirect({ url, baseUrl }) {
      // After login, redirect to admin dashboard
      if (url.startsWith('/admin')) {
        return url
      }
      return baseUrl + '/admin'
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export async function getSession() {
  return await getServerSession(authOptions)
}
