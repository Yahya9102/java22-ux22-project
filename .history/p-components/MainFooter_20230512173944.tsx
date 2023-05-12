import React, { useEffect, useRef, useState } from "react"
import styles from "./styles/mainFooter.module.css"
import { useRouter } from "next/router"
import Image from "next/image"
import navbarImage from "../public/posticon.png"

function MainFooter() {
  const router = useRouter()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [moved, setMoved] = useState(false) // state to track if button has been moved
  const dragStartPos = useRef({ x: 0, y: 0 })

  const handleCreateButtonClick = () => {
    if (!moved) {
      // only trigger if button hasn't been moved
      router.push("/createPost")
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartPos.current = {
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y,
    }
    setDragging(true)
    setMoved(false) // reset moved state on touch start
  }

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault()
    if (dragging) {
      let newX = e.touches[0].clientX - dragStartPos.current.x
      let newY = e.touches[0].clientY - dragStartPos.current.y

      // Ensure the button stays within the window boundaries
      if (newX < 0) newX = 0
      if (newY < 0) newY = 0
      if (newX + 74 > window.innerWidth) newX = window.innerWidth - 74
      if (newY + 64 > window.innerHeight) newY = window.innerHeight - 64

      setPosition({ x: newX, y: newY })
      setMoved(true) // set moved state to true when button is moved
    }
  }

  const handleTouchEnd = () => {
    setDragging(false)
  }

  useEffect(() => {
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  return (
    <div>
      <button
        type="submit"
        onClick={handleCreateButtonClick}
        onTouchStart={handleTouchStart}
      >
        <Image
          src={navbarImage}
          alt=""
          width={74}
          height={64}
          className={styles.image_post}
        />
      </button>
    </div>
  )
}

export default MainFooter
