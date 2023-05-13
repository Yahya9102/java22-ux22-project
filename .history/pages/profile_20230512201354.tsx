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
  const [game, setGame] = useState(null)

  fetch("https://api.rawg.io/api/games?key=5ca93add96354d41ad9b62595ff3ec80")
    .then((response) => response.json())
    .then((data) => {
      let games = data.results.map(
        (game: { name: any; background_image: any }) => ({
          name: game.name,
          image: game.background_image,
        })
      )

      // Shuffle array
      for (let i = games.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[games[i], games[j]] = [games[j], games[i]]
      }

      // Get top 3
      games = games.slice(0, 3)

      console.log(games)
    })
    .catch((error) => console.error("Error:", error))

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
                        width={110}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className={styles.playerInfo_p}>{userData.email}</p>
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
      <div>
        {game ? (
          <div>
            <h2>{game.name}</h2>
            <img src={game.cover.url} alt="game cover" />
          </div>
        ) : (
          "Loading game data..."
        )}
      </div>
    </div>
  )
}

export default Profile
