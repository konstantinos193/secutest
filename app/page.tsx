"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/Hero"
import About from "@/components/About"
import ClientsSection from "@/components/clients-section"
import ServicesSection from "@/components/Services"
import CaseStudiesSection from '@/components/case-studies-section'
import GlobalSection from '@/components/global-section'
import StatisticsSection from '@/components/statistics-section'
import ContactSection from "@/components/Contact"
import DecadesSection from '@/components/decades-section'
import "@/styles/header.css"

export default function Home() {
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // Set video ready after a short delay to ensure proper hydration
    const timer = setTimeout(() => {
      setVideoReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <main>
        <Hero videoReady={videoReady} />
        <About />
        <ClientsSection />
        <ServicesSection />
        <CaseStudiesSection />
        <GlobalSection />
        <StatisticsSection />
        <ContactSection />
        <DecadesSection />
      </main>
    </>
  )
}
