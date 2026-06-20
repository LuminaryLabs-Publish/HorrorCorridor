import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Horror Corridor",
  description: "A green terminal horror corridor prototype with multiplayer maze systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[color:var(--background)] text-[color:var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
