import React from "react"
import styles from "./styles/mainFooter.module.css"
import { useRouter } from "next/router"
import Image from "next/image"
import navbarImage from "../public/posticon.png"

function MainFooter() {
  const router = useRouter()

  const handleCreateButtonClick = () => {
    router.push("/createPost")
  }

  return (
    <div>
      <button
        type="submit"
        onClick={handleCreateButtonClick}
        className={styles.floating_button}
      >
        <Image
          src={navbarImage}
          alt=""
          width={64}
          height={64}
          className={styles.image_post}
        />
      </button>
    </div>
  )
}

export default MainFooter
