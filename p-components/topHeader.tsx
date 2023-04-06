import { NextPage } from "next"
import styles from "./styles/topHeader.module.css"

interface Props {}

const TopHeader: NextPage<Props> = ({}) => {
  return (
    <nav className={styles.body}>
      <div>text</div>
    </nav>
  )
}

export default TopHeader
