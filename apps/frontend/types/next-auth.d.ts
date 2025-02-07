// src/types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Profile {
    preferred_username?: string;
  }

  interface Session {
    user: {
      username?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    expires: string;
  }
}
