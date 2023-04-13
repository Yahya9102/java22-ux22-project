import React from "react"
import styles from "./styles/middleSection.module.css"
import PlayerInfo from "./PlayerInfo"

function MiddleSection() {
  return (
    <div className={styles.middle_section}>
      <div className=" mt-1"></div>

      <div className={styles.table_container}>
        <table className={styles.player_info}>
          <tbody>
            <tr>
              <th className=" pl-7"></th>
            </tr>
            <tr>
              <td>Language1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MiddleSection
