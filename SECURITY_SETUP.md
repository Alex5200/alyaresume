# Admin Panel Security Setup

This document explains how to configure the authentication system for the admin panel.

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Admin Email Authorization (optional)
ADMIN_EMAILS=admin@example.com,user@example.com
```

## Google OAuth Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/

2. **Create a new project** or select an existing one

3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

4. **Create OAuth 2.0 credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Select "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)

5. **Copy the Client ID and Client Secret** to your `.env.local` file

## Admin Email Authorization

The system supports two authorization methods:

### Method 1: Email Whitelist (Recommended)
Set the `ADMIN_EMAILS` environment variable with a comma-separated list of authorized emails:
```bash
ADMIN_EMAILS=admin@example.com,user@example.com
```

### Method 2: Open Access (Development Only)
If `ADMIN_EMAILS` is not set, any Google account can access the admin panel. **Do not use this in production!**

## NextAuth Secret

Generate a secure secret for NextAuth:
```bash
openssl rand -base64 32
```

Add this to your `.env.local` file:
```bash
NEXTAUTH_SECRET=your_generated_secret_here
```

## Security Features

- **Google OAuth Integration**: Secure authentication through Google
- **Email Whitelisting**: Only authorized emails can access admin panel
- **Session Management**: Secure session handling with NextAuth
- **Route Protection**: Middleware protects all admin routes
- **Automatic Logout**: Sessions expire and users can manually logout

## Usage

1. Navigate to `/admin/login`
2. Click "Continue with Google"
3. Sign in with your authorized Google account
4. You'll be redirected to the admin dashboard

## Production Deployment

For production deployment:

1. Update `NEXTAUTH_URL` to your domain
2. Use HTTPS
3. Set strong secrets
4. Configure email whitelist
5. Test the authentication flow thoroughly

## Troubleshooting

### Common Issues

1. **"Invalid client" error**: Check your Google OAuth credentials
2. **Redirect URI mismatch**: Ensure redirect URIs match in Google Console
3. **Access denied**: Check if your email is in the ADMIN_EMAILS list
4. **Session issues**: Verify NEXTAUTH_SECRET is set

### Debug Mode

Add this to your `.env.local` for debugging:
```bash
NEXTAUTH_DEBUG=true
```

## Security Best Practices

1. **Rotate secrets regularly**
2. **Use environment-specific configurations**
3. **Monitor access logs**
4. **Keep dependencies updated**
5. **Use HTTPS in production**
6. **Limit admin access to necessary personnel only**
