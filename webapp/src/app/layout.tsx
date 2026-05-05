
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
// import Header from "@/components/Header"; // No se importa aquí
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700"], 
  variable: "--font-roboto" 
});

export const metadata: Metadata = {
  title: "MarkNova - CETis 112",
  description: "Plataforma de emprendimiento y noticias para la comunidad del CETis 112.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${roboto.variable}`}>
        <UserProvider>
          {/* El Header ya no está aquí globalmente */}
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
