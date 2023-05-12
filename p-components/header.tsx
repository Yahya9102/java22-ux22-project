import { NextPage } from "next"
import Image from "next/image"
import gmlogo from "/public/gmlogo.png"
import Navposticon from "@/public/navtoposticon.png"
import Adminlockicon from "@/public/adminlockicon.png"
import Guidelinesicon from "@/public/guidelinesicon.png"
import Logouticon from "@/public/logouticon.png"

import styles from "./styles/header.module.css"
import router, { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Header: NextPage = ({}) => {
  const handleReturnToStartPage = () => {
    router.push("/startPage")
  }

  const handleReturnToGuidelines = () => {
    router.push("/GuidelinePage")
    sessionStorage.removeItem("email")
  }

  const handleReturnToAdminPage = () => {
    router.push("/adminLogin")
  }

  const [menuIsOpen, setMenuIsOpen] = useState(false)

  // show and hide hamburger-menu
  const handleToggle = () => {
    setMenuIsOpen(!menuIsOpen)
  }

  return (
    <div className={styles.header_background}>
      <header className={styles.header_body}>
        <div className={styles.menu_icon}>
          <button type="button" onClick={handleToggle}>
            <span
              className={`${styles.hamburger} ${
                menuIsOpen ? styles.cross : ""
              }`}
            ></span>
            <span
              className={`${styles.hamburger} ${
                menuIsOpen ? styles.cross : ""
              }`}
            ></span>
            <span
              className={`${styles.hamburger} ${
                menuIsOpen ? styles.cross : ""
              }`}
            ></span>
          </button>
        </div>

        <div className={styles.logo_container}>
          <button type="submit" onClick={handleReturnToStartPage}>
            <Image src={gmlogo} alt="Picture unavailable" width={95} />
          </button>
        </div>
        <div className={styles.spacer}></div>

        {menuIsOpen && (
          <nav className={styles.navigation_bar}>
            <div className={styles.postsListItem}>
              <button type="submit" onClick={handleReturnToStartPage}>
                <Image src={Navposticon} alt="Picture unavailable" width={45} />
              </button>
              <h5>Posts</h5>
            </div>

            <div className={styles.guidlinesListItem}>
              <button type="submit" onClick={handleReturnToGuidelines}>
                <Image
                  src={Guidelinesicon}
                  alt="Picture unavailable"
                  width={45}
                />
              </button>
              <h5>Guidelines</h5>
            </div>

            <div className={styles.logoutListItem}>
              <button type="submit" onClick={handleReturnToGuidelines}>
                <Image src={Logouticon} alt="Picture unavailable" width={45} />
              </button>
              <h5>Log Out</h5>
            </div>

            <div className={styles.adminListItem}>
              <button type="submit" onClick={handleReturnToAdminPage}>
                <Image
                  src={Adminlockicon}
                  alt="Picture unavailable"
                  width={45}
                />
              </button>
              <h5>Admin</h5>
            </div>
          </nav>
        )}
      </header>
    </div>
  )
}

export default Header
