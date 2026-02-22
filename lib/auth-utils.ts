import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Pre-hashed password for admin (change this in production)
export const ADMIN_HASHED_PASSWORD = '$2b$12$b9RVwvBe8Z14vg4KLPhqbOFnpRM2h47btuvqG.2gBUpHyYH/JYXcq' // password: "admin123"
