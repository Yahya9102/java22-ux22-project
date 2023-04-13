import { NextPage } from "next"
import Image from "next/image"
import styles from "./styles/header.module.css"
import burgermenu from "../media/hamburger-menu.png"

interface Props {}

const Header: NextPage<Props> = ({}) => {
  return (
    <header className={styles.header}>
      <div className={styles.menu_icon_div}>
        <Image src={burgermenu} alt={"#"} className={styles.menu_icon}></Image>
      </div>
      <div className={styles.menu_title}>
        <h1>Posts</h1>
      </div>
    </header>
  )
}

export default Header
