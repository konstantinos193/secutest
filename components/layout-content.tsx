"use client";

import { Michroma } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Cursor from "@/components/cursor";
import PageGridMask from "@/components/page-grid-mask";
import "@/public/assets/styles/main.css";
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  useSmoothScroll();

  return (
    <div className={michroma.className}>
      <Header />
      <main>{children}</main>
      <Footer />
      <Cursor />
      <PageGridMask />
    </div>
  );
} 