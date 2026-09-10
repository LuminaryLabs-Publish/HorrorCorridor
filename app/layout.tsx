import type { ReactNode } from "react";
import "../src/styles.css";
export const metadata = { title: "HorrorCorridor", description: "Explore. Listen. Survive. Remember." };
export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
