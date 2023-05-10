import { NextPage } from "next"
import Image from "next/image"
import gmlogo from "/public/gmlogo.png"
import Navposticon from "@/public/navtoposticon.png"
import Adminlockicon from "@/public/adminlockicon.png"
import Guidelinesicon from "@/public/guidelinesicon.png"
import Closeicon from "@/public/xcloseicon.png"
import styles from "./styles/header.module.css"
import { useRouter } from "next/router"
import { useState } from "react"
import Burgermenu from "@/public/hamburger-menu.png"

interface Props {}

const Header: NextPage<Props> = ({}) => {
  const router = useRouter()

  const handleReturnToStartPage = () => {
    router.push("/startPage")
  }

  const handleReturnToGuidelines = () => {
    router.push("/GuidelinePage")
  }

  const handleReturnToAdminPage = () => {
    router.push("/admin")
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
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
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
            <ul className={styles.navigation_links}>
              {/* <div className={styles.menu_icon}>
                <button
                  type="submit"
                  onClick={handleToggle}
                  className={styles.nav_toggle_button}
                >
                  <Image
                    src={Closeicon}
                    alt="Picture unavailable"
                    width={28}
                    className={styles.nav_logo}
                  />
                </button>
              </div> */}
              <li className={styles.postsListItem}>
                <h5>Posts</h5>
                <button type="submit" onClick={handleReturnToStartPage}>
                  <Image
                    src={Navposticon}
                    alt="Picture unavailable"
                    width={100}
                  />
                </button>
              </li>
              <li className={styles.guidlinesListItem}>
                <h5>Guidelines</h5>
                <button type="submit" onClick={handleReturnToGuidelines}>
                  <Image
                    src={Guidelinesicon}
                    alt="Picture unavailable"
                    width={100}
                  />
                </button>
              </li>
              <li className={styles.adminListItem}>
                <h5>Admin</h5>
                <button type="submit" onClick={handleReturnToAdminPage}>
                  <Image
                    src={Adminlockicon}
                    alt="Picture unavailable"
                    width={100}
                  />
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </div>
  )
}

export default Header
