import { NextPage } from "next"
import styles from "p-components/styles/playerInfo.module.css"
import { useEffect, useState } from "react"
import { User } from "@/types/users"
//import Image from "next/image"
//import heartimage from "../public/heartimage.png"

interface Props {}

const Body: NextPage<Props> = ({}) => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/")
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
      <button
        onClick={() => {
          console.log(users)
        }}
      >
        display console data
      </button>
      {Array.isArray(users) &&
        users.map((user) => (
          <fieldset className={styles.fieldset_body} key={user.name}>
            <table>
              <thead>
                <tr>
                  <th className={styles.tableHeader_PlayerInfo}>{user.name}</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <fieldset className={styles.fieldset_row}>
                      <h2 className={styles.playerInfo_h2}>{user.title}</h2>
                      <br />
                      <p> {user.post}</p>
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <nav>
                        <br />
                        <h2 className={styles.playerInfo_h2}>
                          <strong>Contact</strong>
                        </h2>
                        <br />
                        <a href="https://discord.com/">
                          <strong>Discord: {user.discord}</strong>
                        </a>
                      </nav>
                    </div>
                  </td>
                </tr>
                {/**   <tr>
                <td>
                  <div className={styles.table_button_wrapper}>
                    <Image
                      src={heartimage}
                      className={styles.heartimage}
                      alt="Heart icon"
                    />
                    <button className={styles.table_button}>Reply</button>
                  </div>
                </td>
              </tr> */}
              </tbody>
            </table>
          </fieldset>
        ))}
    </div>
  )
}

export default Body
