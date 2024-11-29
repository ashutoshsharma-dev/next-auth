// lib/authOptions.ts (or any other file where you define auth options)

import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  // Secret for NextAuth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,       // GitHub Client ID from your GitHub OAuth app
      clientSecret: process.env.GITHUB_CLIENT_SECRET, // GitHub Client Secret from your GitHub OAuth app
      // GitHub requires a redirect URI to be set, but it will be automatically generated
      // using `NEXTAUTH_URL` environment variable.
    }),
  ],

  // Optional settings
  session: {
    strategy: 'jwt',  // Use JWT-based sessions (you can also use database sessions if needed)
  },

  // Callbacks to handle user info or token info, etc.
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Store user ID in the token
        token.email = user.email; // Store user email in the token
      }
      return token;
    },

    async session({ session, token }) {
      session.id = token.id;  // Add the token info to the session
      session.email = token.email;
      return session;
    },
  },
};
