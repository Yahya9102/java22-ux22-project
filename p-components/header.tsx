import { NextPage } from "next"
import Image from "next/image"
import gmlogo from "/public/gmlogo.png"
import styles from "./styles/header.module.css"
import { useRouter } from "next/router"
// import "../media/hamburger-menu.png"

interface Props {}

const Header: NextPage<Props> = ({}) => {
  const router = useRouter()

  const handleReturnToStartPage = () => {
    router.push("/startPage")
  }

  return (
    <div className={styles.header_background}>
      <header className={styles.header_body}>
        <div className={styles.menu_title}>
          <button type="submit" onClick={handleReturnToStartPage}>
            <Image src={gmlogo} alt="Picture is unavailable" width={95} />
          </button>
          {/* <h1>
            <strong>GameMatch</strong>
          </h1> */}
        </div>
      </header>
    </div>
  )
}

export default Header
