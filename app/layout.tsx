import type { Metadata } from "next";
import LayoutContent from "@/components/layout-content";

export const metadata: Metadata = {
  title: "SECU Security Solutions",
  description: "Advanced security solutions for modern challenges",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-white">
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
