import { NextPage } from "next"
import Image from "next/image"
import styles from "/p-components/styles/guidelinePage.module.css"

const GuidelinePage: NextPage = () => {
  return (
    <div className={styles.guidelinePage_body}>
      <div>
        {" "}
        <h1 className={styles.h1}>YAY! Were excited to have you onboard! <3!</h1>
      </div>
    </div>
  )
}

export default GuidelinePage
