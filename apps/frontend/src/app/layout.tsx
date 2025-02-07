import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import ClientProvider from "./ClientProvider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import LogoutPage from "@/components/common/LogoutPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SessionProviderWrapper from "@/components/common/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "G360",
  description: "Back Office App for Grupo SEI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Recupera a sessão do servidor (é uma função assíncrona)
  const session = await getServerSession(authOptions);

  return (
    <html lang="pt-BR">
      <body className={inter.className + " min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/Background.png')]"}>

        <ClientProvider>
          <SessionProviderWrapper>
          {session ? (
            <>
              <Header {...session} />
              <main>{children}</main>
              <Footer />
            </>
          ) : (
            <h1>Não Autenticado</h1>
          )}
          <Toaster />
          </SessionProviderWrapper>
        </ClientProvider>

      </body>
    </html>
  );
}
