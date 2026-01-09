import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Submit Claim",
  description: "Submit Claim Form",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
