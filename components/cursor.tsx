"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const setLeft = useRef<((value: number) => void) | null>(null)
  const setTop = useRef<((value: number) => void) | null>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Remove system cursor hiding (do not inject style)

    // GSAP quick setters for left/top
    setLeft.current = gsap.quickTo(cursor, "left", { duration: 0.3, ease: "power3" })
    setTop.current = gsap.quickTo(cursor, "top", { duration: 0.3, ease: "power3" })

    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      if (setLeft.current && setTop.current) {
        setLeft.current(e.clientX)
        setTop.current(e.clientY)
      }
      if (
        (e.target as HTMLElement)?.matches?.("[data-hide-cursor]") ||
        (e.target as HTMLElement)?.closest?.("[data-hide-cursor]")
      ) return
      gsap.set(cursor, { opacity: 1, duration: 0.3, ease: "power3" })
    }

    // Hover/Click/Hide logic
    const handleHover = (scale: number) => {
      gsap.to(cursor, { scale, duration: 0.3, ease: "power3" })
    }
    const handleHide = () => {
      gsap.to(cursor, { scale: 0, duration: 0.3, ease: "power3" })
    }
    const handleShow = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3" })
    }

    // Listeners for links/buttons
    const links = document.querySelectorAll("a")
    const buttons = document.querySelectorAll("button")
    const hideCursorEls = document.querySelectorAll("[data-hide-cursor]")

    links.forEach(link => {
      link.addEventListener("mouseenter", () => handleHover(1.5))
      link.addEventListener("mouseleave", () => handleShow())
    })
    buttons.forEach(btn => {
      btn.addEventListener("mouseenter", () => handleHover(1.5))
      btn.addEventListener("mouseleave", () => handleShow())
    })
    hideCursorEls.forEach(el => {
      el.addEventListener("mouseenter", handleHide)
      el.addEventListener("mouseleave", handleShow)
    })

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", () => handleHover(2))
    window.addEventListener("mouseup", () => handleShow())

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", () => handleHover(2))
      window.removeEventListener("mouseup", () => handleShow())
      links.forEach(link => {
        link.removeEventListener("mouseenter", () => handleHover(1.5))
        link.removeEventListener("mouseleave", () => handleShow())
      })
      buttons.forEach(btn => {
        btn.removeEventListener("mouseenter", () => handleHover(1.5))
        btn.removeEventListener("mouseleave", () => handleShow())
      })
      hideCursorEls.forEach(el => {
        el.removeEventListener("mouseenter", handleHide)
        el.removeEventListener("mouseleave", handleShow)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor"
        style={{
          "--size": "25px",
          "--white": "#f9fdfe",
        } as React.CSSProperties}
      />
      <style jsx global>{`
        .cursor {
          --size: 25px;
          background: #fff !important;
          width: var(--size);
          height: var(--size);
          z-index: 99999;
          opacity: 0;
          pointer-events: none;
          border-radius: 50%;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: none !important;
          filter: none !important;
          border: none !important;
          transition: opacity 0.3s cubic-bezier(.4,0,.2,1);
        }
        @media (max-width: 768px) {
          .cursor { display: none; }
        }
      `}</style>
    </>
  )
}

export default Cursor