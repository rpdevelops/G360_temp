// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
        session.user = {
        username: token.username as string | undefined,
        name: token.name as string | null,
        email: token.email as string | null,
        image: token.picture as string | null,
      };
      session.expires = session.expires; // Preserve the `expires` value
      return session;
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.username = profile.preferred_username; // Usa a nova tipagem de preferred_username
        token.name = profile.name;
        token.email = profile.email;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
