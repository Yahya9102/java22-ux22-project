import { NextPage } from "next"
import Image from "next/image"
import styles from "./styles/header.module.css"
import "../media/hamburger-menu.png"

interface Props {}

const Header: NextPage<Props> = ({}) => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.menu_icon_div}>
          {/* <Image
            src={"../media/hamburger-menu.png"}
            alt={"#"}
            className={styles.menu_icon}
          ></Image> */}
        </div>
        <div className={styles.menu_title}>
          <h1>
            <strong>GameMatch</strong>
          </h1>
        </div>
      </header>
    </div>
  )
}

export default Header
