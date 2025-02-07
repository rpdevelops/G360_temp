// src/components/Login.tsx
"use client"
import { signIn } from "next-auth/react";
import { Button } from "../button";
export default function Login() {
  return <Button onClick={() => signIn("keycloak")}>
    Login
  </Button>
}