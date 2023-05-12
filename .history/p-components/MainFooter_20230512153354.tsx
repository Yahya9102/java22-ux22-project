import React, { useEffect, useRef, useState } from "react"
import styles from "./styles/mainFooter.module.css"
import { useRouter } from "next/router"
import Image from "next/image"
import navbarImage from "../public/posticon.png"

function MainFooter() {
  const router = useRouter()
  const [position, setPosition] = useState({ x: 370, y: 650 })
  const [dragging, setDragging] = useState(false)
  const dragStartPos = useRef({ x: 0, y: 0 })

  const handleCreateButtonClick = (e: React.MouseEvent) => {
    if (!dragging) {
      router.push("/createPost")
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    setDragging(false)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y,
      })
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragging(true)
    dragStartPos.current = {
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y,
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (dragging) {
      setPosition({
        x: e.touches[0].clientX - dragStartPos.current.x,
        y: e.touches[0].clientY - dragStartPos.current.y,
      })
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    setDragging(false)
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)

    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)

      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [dragging])

  return (
    <div>
      <nav
        className={styles.main_footer}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        <button
          type="submit"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={handleCreateButtonClick}
        >
          <Image
            src={navbarImage}
            alt=""
            width={74}
            height={64}
            className={styles.image_post}
          />
        </button>
      </nav>
    </div>
  )
}

export default MainFooter
