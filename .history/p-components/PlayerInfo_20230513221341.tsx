import { NextPage } from "next"
import styles from "p-components/styles/playerInfo.module.css"
import { useEffect, useState } from "react"
import { User } from "@/types/users"

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
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 245 240"
                            >
                              <path
                                d="M122.5 0C54.93 0 0 54.93 0 122.5S54.93 245 122.5 245 245 190.07 245 122.5 190.07 0 122.5 0zm-1.84 183.15c-46.88 0-84.75-37.88-84.75-84.75s37.88-84.75 84.75-84.75 84.75 37.88 84.75 84.75-37.87 84.75-84.75 84.75zm51.69-77.4c-2.16 0-3.92 1.76-3.92 3.92v18.11c0 2.17 1.76 3.92 3.92 3.92h16.55c2.17 0 3.92-1.76 3.92-3.92V109.28c0-2.17-1.76-3.92-3.92-3.92h-16.55c-2.16 0-3.92 1.76-3.92 3.92v45.47zm-89.58 0c-2.17 0-3.92 1.76-3.92 3.92v18.11c0 2.17 1.76 3.92 3.92 3.92h16.55c2.17 0 3.92-1.76 3.92-3.92V109.28c0-2.17-1.76-3.92-3.92-3.92H83.72c-2.16 0-3.92 1.76-3.92 3.92v45.47zm-21.98-45.47c0-24.42 19.89-44.3 44.3-44.3 24.41 0 44.3 19.88 44.3 44.3 0 24.41-19.89 44.3-44.3 44.3-24.41 0-44.3-19.89-44.3-44.3zm103.81 0c0-24.42 19.89-44.3 44.3-44.3s44.3 19.88 44.3 44.3c0 24.41-19.89 44.3-44.3 44.3s-44.3-19.89-44.3-44.3z"
                                fill="#7289da"
                              />
                            </svg>
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
