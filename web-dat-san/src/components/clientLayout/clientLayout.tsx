"use client";

import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/partials/Header/Header";
import Footer from "@/components/partials/Footer/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Header />
      <body>
        <main className="main">{children}</main>
      </body>
      <Footer />
    </AuthProvider>
  );
}
