import { NextPage } from "next"
import styles from "./styles/contentFrame.module.css"
import Image from "next/image"
import fortnite from "../public/fortnite_image.jpg"

interface Props {}

const ContentFrame: NextPage<Props> = ({}) => {
  return (
    <div className={styles.body}>
      <div>
        <Image src={fortnite} alt={"#"} className={styles.topImg}></Image>
      </div>
      <div>
        <Image src={fortnite} alt={"#"} className={styles.profileImg}></Image>
      </div>
      <div className={styles.nickName_div}>
        <h4>Nick Name</h4>
      </div>
      <div className={styles.realName_div}>
        <p>Real Name</p>
      </div>
    </div>
  )
}

export default ContentFrame
