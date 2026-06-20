"use client";

import { SessionProvider } from "next-auth/react";
import { AdminShell } from "@/components/admin/AdminShell";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminShell>{children}</AdminShell>
    </SessionProvider>
  );
}
