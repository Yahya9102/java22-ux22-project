import { NextPage } from "next"
import styles from "p-components/styles/playerInfo.module.css"
import { useEffect, useState } from "react"
import { User } from "@/types/users"
import reporticon from "/public/reporticon.png"

import Image from "next/image"
//import heartimage from "../public/heartimage.png"

const Body: NextPage = ({}) => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/")
        const data = await response.json()
        if (Array.isArray(data)) {
          setUsers(data)
          console.log(data)
        } else {
          console.log("Data is not an array:", data)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      {Array.isArray(users) &&
        users.map((user) => (
          <fieldset className={styles.fieldset_body} key={user._id}>
            <table>
              <thead>
                <div className={styles.header_logos}>
                  <tr>
                    <th className={styles.tableHeader_PlayerInfo}>
                      {user.name}
                      <h6 className={styles.user_location}> {user.location}</h6>
                    </th>
                  </tr>
                  <tr>
                    <Image
                      className={styles.reporticon_logo}
                      src={reporticon}
                      alt="Picture is unavailable"
                      width={30}
                    />
                  </tr>
                </div>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <h2 className={styles.playerInfo_h2_title}>{user.title}</h2>
                    <br />
                    <p className={styles.playerInfo_p}> {user.post}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <br />
                      <h2 className={styles.playerInfo_h2}>Contact</h2>
                      <br />
                      <a
                        href={`discord://discordapp.com/users/${user.discord}`}
                      ></a>
                      <p className={styles.playerInfo_p}>
                        Discord: {user.discord}
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        ))}
    </div>
  )
}

export default Body
