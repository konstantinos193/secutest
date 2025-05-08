"use client"

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
  return (
    <>
      <main>
        <Hero videoReady={true} />
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
