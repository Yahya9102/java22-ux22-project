import React from "react"
import styles from "./styles/mainFooter.module.css"
import { useRouter } from "next/router"

function MainFooter() {
  const router = useRouter()

  const handleCreateButtonClick = () => {
    router.push("/createUser")
  }

  return (
    <div>
      <nav className={styles.main_footer}>
        <button type="submit" onClick={handleCreateButtonClick}>
          <img src="./Post icon.png" alt="" className={styles.image_post} />
        </button>
      </nav>
    </div>
  )
}

export default MainFooter
