import { NextPage } from "next"
import styles from "p-components/styles/playerInfo.module.css"
import { useEffect, useState } from "react"
import { User } from "@/types/users"
import discordLogo from "../public/DiscordLogo.png"
import navbarImage from "../public/posticon.png"
import Image from "next/image"
import router from "next/router"
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
      <div className={styles.table_container}>
        <h1 className={styles.posts_text}></h1>
      </div>

      {Array.isArray(users) &&
        users.map((user) => (
          <div key={user._id}>
            <fieldset className={styles.fieldset_body} key={user._id}>
              <table>
                <thead>
                  <tr>
                    <th className={styles.tableHeader_PlayerInfo}>
                      {user.name}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <h2 className={styles.playerInfo_h2_title}>
                        {user.title}
                      </h2>
                      <br />
                      <p className={styles.playerInfo_p}> {user.post}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <nav>
                          <br />
                          <h2 className={styles.playerInfo_h2}>Contact</h2>
                          <br />
                          <a
                            href={`discord://discordapp.com/users/${user.discord}`}
                          >
                            <Image
                              src={discordLogo}
                              width={20}
                              height={10}
                              alt="Picture not available"
                            />
                            <p className={styles.playerInfo_p_contact}>
                              {user.discord}
                            </p>
                          </a>
                        </nav>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </div>
        ))}
    </div>
  )
}

export default Body
