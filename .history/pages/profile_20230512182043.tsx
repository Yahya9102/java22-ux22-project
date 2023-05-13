import { NextPage } from "next"
import { useEffect, useState } from "react"
import router, { useRouter } from "next/router"
import { User } from "@/types/users"
import styles from "p-components/styles/profile.module.css"
import Header from "@/p-components/header"

interface UserProps {
  email: string
  name: string
}

const Profile: NextPage<UserProps> = ({}) => {
  const [userData, setUserData] = useState<UserProps | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const sessionEmail = sessionStorage.getItem("email")
      if (!sessionEmail) return
      try {
        const response = await fetch(`/api/user?email=${sessionEmail}`)

        const data = await response.json()
        setUserData(data)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

  function redirectToCreatePost() {
    const sessionEmail = sessionStorage.getItem("email")
    if (sessionEmail) {
      router.push(`/createpost?email=${encodeURIComponent(sessionEmail)}`)
    }
  }

  const [avatarSvg, setAvatarSvg] = useState<string>("")

  let avatarId = userData?.name
  useEffect(() => {
    fetch("https://api.multiavatar.com/" + avatarId)
      .then((res) => res.text())
      .then((svg) => setAvatarSvg(svg))
  }, [avatarId])

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <fieldset className={styles.fieldset_body}>
          <table>
            <thead>
              <tr>
                <th className={styles.tableHeader_PlayerInfo}>
                  {userData ? <h2>{userData.name}</h2> : <p>Loading...</p>}
                </th>
              </tr>
            </thead>

            <tbody>
              {userData ? (
                <>
                  <tr>
                    <td>
                      <img
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(
                          avatarSvg
                        )}`}
                        alt="Avatar"
                        width={95}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className={styles.playerInfo_p}>
                        Email: {userData.email}
                      </p>
                    </td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td>Loading user data...</td>
                </tr>
              )}
            </tbody>
          </table>
        </fieldset>
      </div>
    </div>
  )
}

export default Profile
