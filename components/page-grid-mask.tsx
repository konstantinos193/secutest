"use client"
import React, { useEffect, useRef } from "react"

const GRID_IMAGE = "/assets/images/bg-grid.png" // public/assets/images/bg-grid.png

const PageGridMask: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function updateMouse(e: MouseEvent) {
      if (window.innerWidth < 1024) return // Only on large screens
      if (ref.current) {
        ref.current.style.setProperty("--mouse-x", `${e.clientX}px`)
        ref.current.style.setProperty("--mouse-y", `${e.clientY}px`)
      }
    }
    window.addEventListener("mousemove", updateMouse)
    return () => window.removeEventListener("mousemove", updateMouse)
  }, [])

  // Set initial mouse position to center
  useEffect(() => {
    if (ref.current && window.innerWidth >= 1024) {
      ref.current.style.setProperty("--mouse-x", `${window.innerWidth / 2}px`)
      ref.current.style.setProperty("--mouse-y", `${window.innerHeight / 2}px`)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="page-grid-mask"
      style={{
        // These are defaults; real values are set by JS above
        // Only visible on large screens (handled by CSS)
        "--mouse-size": "80rem",
        "--mouse-x": "50vw",
        "--mouse-y": "50vh",
      } as React.CSSProperties}
    />
  )
}

export default PageGridMask
