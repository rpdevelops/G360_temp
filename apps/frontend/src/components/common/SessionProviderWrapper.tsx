// src/components/SessionProviderWrapper.tsx
"use client";

import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import LogoutPage from "@/components/common/LogoutPage";

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (!session) {
    return <LogoutPage />;
  }

  return <>{children}</>;
}
