import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// Admin credentials from environment
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com"
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ""

// Hardcoded fallback for development (only used if env var not set)
const FALLBACK_HASH = "$2b$12$b9RVwvBe8Z14vg4KLPhqbOFnpRM2h47btuvqG.2gBUpHyYH/JYXcq" // admin123

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("=== NextAuth authorize ===")
        console.log("Credentials email:", credentials?.email)
        console.log("ADMIN_EMAIL env:", ADMIN_EMAIL)
        console.log("Has password hash:", !!ADMIN_PASSWORD_HASH)
        
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials")
          return null
        }

        // Check email
        if (credentials.email !== ADMIN_EMAIL) {
          console.log("Email mismatch:", credentials.email, "!==", ADMIN_EMAIL)
          return null
        }

        // Verify password
        const hash = ADMIN_PASSWORD_HASH || FALLBACK_HASH
        console.log("Using hash (first 20 chars):", hash.substring(0, 20) + "...")
        
        try {
          const valid = await bcrypt.compare(credentials.password, hash)
          console.log("Password valid:", valid)

          if (!valid) {
            return null
          }
        } catch (err) {
          console.error("Bcrypt error:", err)
          return null
        }

        console.log("Authorization successful")
        return {
          id: "admin-1",
          email: ADMIN_EMAIL,
          name: "Administrator",
        }
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        const allowed = (process.env.ALLOWED_EMAILS || "").split(",").map(e => e.trim()).filter(Boolean)
        return allowed.length === 0 || allowed.includes(user?.email || "")
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/admin")) return url
      return `${baseUrl}/admin`
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }

