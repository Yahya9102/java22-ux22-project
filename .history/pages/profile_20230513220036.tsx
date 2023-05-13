import { NextPage } from "next"
import { useEffect, useState } from "react"
import styles from "p-components/styles/profile.module.css"
import Header from "@/p-components/header"

interface UserProps {
  email: string
  name: string
}

const Profile: NextPage<UserProps> = ({}) => {
  const [userData, setUserData] = useState<UserProps | null>(null)
  const [games, setGames] = useState<any[]>([])
  const API_KEY = process.env.NEXT_PUBLIC_GAMES_API_KEY
  const apiKey = "VJkTFjycSRiN29"

  useEffect(() => {
    const fetchGames = async () => {
      try {
        let storedGames = sessionStorage.getItem("games")

        if (storedGames) {
          const parsedGames = JSON.parse(storedGames)
          setGames(parsedGames)
        } else {
          const response = await fetch(
            `https://api.rawg.io/api/games?key=${API_KEY}`
          )
          const data = await response.json()

          let games = data.results.map((game: any) => ({
            name: game.name,
            image: game.background_image,
          }))

          for (let i = games.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[games[i], games[j]] = [games[j], games[i]]
          }
          games = games.slice(0, 3)

          sessionStorage.setItem("games", JSON.stringify(games))
          setGames(games)
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchGames()
  }, [])

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

  const [avatarSvg, setAvatarSvg] = useState<string>("")

  let avatarId = userData?.name

  useEffect(() => {
    fetch(`https://api.multiavatar.com/${avatarId}?apikey=${apiKey}`)
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
        <h1 className={styles.game_h1}>
          <strong>Favorite Games</strong>{" "}
        </h1>
        <div className={styles.container_games}>
          {games ? (
            games.map(
              (game: { name: string; image: string }, index: number) => (
                <div className={styles.gameCard} key={index}>
                  <img
                    className={styles.gameImage}
                    src={game.image}
                    alt="game cover"
                  />

                  <h6 className={styles.gameTitle}>{game.name}</h6>
                </div>
              )
            )
          ) : (
            <p>Loading game data...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
