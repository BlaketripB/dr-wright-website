import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Dr. Wright Chiropractic | Payson, Utah",
  description:
    "Gentle, personalized chiropractic care in Payson, UT. Family-focused care, same-week appointments, low-force options. Call (801) 465-8800.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
