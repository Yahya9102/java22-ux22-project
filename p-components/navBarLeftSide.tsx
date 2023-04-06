import { NextPage } from "next"
import styles from "./styles/navBarLeftSide.module.css"

interface Props {}

const NavBarLeftSide: NextPage<Props> = ({}) => {
  return (
    <>
      <nav className={styles.body}>
        <br />
        <section className={styles.section}>
          <h6>Explore</h6>
          <br />
          <div>
            <p className={styles.p}>Matching</p>
            <p className={styles.p}>Chat</p>
          </div>
        </section>
      </nav>
    </>
  )
}

export default NavBarLeftSide
