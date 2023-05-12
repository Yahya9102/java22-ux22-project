import { NextPage } from "next"
import { useEffect, useState } from "react"
import router, { useRouter } from "next/router"
import { User } from "@/types/users"
import styles from "p-components/styles/profile.module.css"
import Header from "@/p-components/header"
import { MyChatComponent } from "@/p-components/ChatPage"

interface UserProps {
  email: string
  name: string
}

const Profile: NextPage<UserProps> = ({}) => {
  const router = useRouter()
  const [userData, setUserData] = useState<UserProps | null>(null)
  const { email } = router.query

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // First, check if there is an active session
        const sessionResponse = await fetch("/api/checkSession")
        const sessionData = await sessionResponse.json()

        // If there is no active session, don't fetch user data
        if (!sessionData.loggedIn) return

        // If there is an active session, fetch user data
        const response = await fetch(
          `/api/user?email=${encodeURIComponent(sessionData.email)}`
        )
        const data = await response.json()
        setUserData(data)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

  function redirectToCreatePost() {
    if (email) {
      router.push(`/createpost?email=${encodeURIComponent(email as string)}`)
    }
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Profile</h1>
        {userData ? (
          <div className={styles.user_info}>
            <button className={styles.button} onClick={redirectToCreatePost}>
              Create a post
            </button>
            <h2>{userData.name}</h2>
            <p>email: {userData.email}</p>
            <p>name: {userData.name}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        {userData && (
          <div className={styles.chat_container}>
            <MyChatComponent userId={userData.email} userName={userData.name} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
