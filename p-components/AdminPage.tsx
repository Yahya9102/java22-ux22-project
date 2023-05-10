import { NextPage } from "next"
import style from "p-components/styles/adminPage.module.css"
import { useEffect, useState } from "react"
import { User } from "@/types/users"
import router from "next/router"
import Breaks from "./breaks"
import styles from "p-components/styles/playerInfo.module.css"

const AdminPage: NextPage = () => {
  const [users, setUsers] = useState<User[]>([])

  const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api")
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

  const handleDeleteClick = async (_id: string) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this user?"
    )
    console.log(_id)
    if (shouldDelete) {
      try {
        const response = await fetch(`/api/deleteUser?userId=${_id}`, {
          method: "DELETE",
        })
        if (!response.ok) {
          throw new Error("Failed to delete user")
        }
        router.reload()
      } catch (error) {
        console.error("Error deleting user:", error)
      }
    }
  }

  // a variable for the input values
  const [editValues, setEditValues] = useState({
    name: "",
    location: "",
    title: "",
    post: "",
    discord: "",
  })

  // An asyncronous function which takes edit values and update/patch it
  const handleEditSubmit = async (_id: string, user: User) => {
    console.log(_id)
    try {
      const { name, location, title, post, discord } = editValues

      // Create an object with only the new values
      const userToUpdate: Partial<User> = {}

      if (name) userToUpdate.name = name
      if (location) userToUpdate.location = location
      if (title) userToUpdate.title = title
      if (post) userToUpdate.post = post
      if (discord) userToUpdate.discord = discord

      const response = await fetch(
        "http://localhost:3000/api/editUser?id=${_id}",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userToUpdate),
        }
      )
      if (!response.ok) {
        throw new Error("Failed to edit user")
      }
      router.reload()
    } catch (error) {
      console.error("Error editing user info:", error)
    }
  }

  //this is for the playerinfos below
  const [showForm, setShowForm] = useState(false)

  // this is for the loging to dissappear
  const [showLogin, setShowLogin] = useState(false)

  const hideLoging = () => {
    setShowLogin(false)
  }

  // for hovering over the delete-button
  const [isHovered, setIsHovered] = useState<boolean>(false)

  // when hovering the delete-button
  const handleHovering = () => {
    setIsHovered(true)
  }

  // when not hovering the delete-button
  const handleHoveringQuit = () => {
    setIsHovered(false)
  }

  const handleChangeClick = async (_id: string) => {
    // setShowForm(true)
  }

  const handleLoginClick = () => {
    if (
      adminCredentials.username === ADMIN_USERNAME &&
      adminCredentials.password === ADMIN_PASSWORD
    ) {
      setShowForm(true)
      hideLoging()
    } else {
      alert("Invalid admin username or password")
    }
  }

  return (
    <div>
      <div>
        <fieldset>
          <label htmlFor="adminUsername">Admin Username:</label>
          <br />
          <input
            className={style.input_fields}
            type="text"
            name="adminUsername"
            id="adminUsername"
            value={adminCredentials.username}
            onChange={(e) =>
              setAdminCredentials({
                ...adminCredentials,
                username: e.target.value,
              })
            }
            placeholder="Username"
          />

          <br />
          <label className={style.label} htmlFor="adminPassword">
            Admin Password:
          </label>
          <br />
          <input
            className={style.input_fields}
            type="password"
            name="adminPassword"
            id="adminPassword"
            value={adminCredentials.password}
            onChange={(e) =>
              setAdminCredentials({
                ...adminCredentials,
                password: e.target.value,
              })
            }
            placeholder="password"
          />
          <br />
          <button
            className={styles.createpost_button}
            onClick={handleLoginClick}
          >
            Login
          </button>
        </fieldset>
      </div>

      {showForm &&
        Array.isArray(users) &&
        users.map((user) => (
          <fieldset
            className={styles.fieldset_body}
            key={JSON.stringify(user._id)}
          >
            <table>
              <thead>
                <tr>
                  <th className={styles.tableHeader_PlayerInfo}>
                    {user.name}
                    <h6 className={styles.user_location}> {user.location}</h6>
                  </th>
                </tr>
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
                      <nav>
                        <br />
                        <h2 className={styles.playerInfo_h2}>Contact</h2>
                        <br />
                        <a
                          href={`discord://discordapp.com/users/${user.discord}`}
                        >
                          <p className={styles.playerInfo_p}>
                            <strong>Discord:</strong> {user.discord}
                          </p>
                        </a>
                      </nav>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>ID: {JSON.stringify(user._id)}</p>
                    <button
                      onClick={() => handleDeleteClick(user._id.toString())}
                      onMouseEnter={handleHovering}
                      onMouseLeave={handleHoveringQuit}
                      className={styles.createpost_button}
                    >
                      Delete
                    </button>
                    <button
                      className={styles.createpost_button}
                      onClick={() => handleChangeClick(user._id.toString())}
                    >
                      Edit
                    </button>
                    {/* {showForm && (
                  <div>
                    <div>
                      <h2>Edit existing post</h2>
                      <form>
                        <label htmlFor="editName">Change name:</label>
                        <br />
                        <input
                          type="text"
                          name="editName"
                          id="editName"
                          placeholder="You wanna change the name?"
                        />
                        <br />
                        <button type="submit">Change Post</button>
                      </form>
                      <button onClick={handleChangeClose}>X</button>
                    </div>
                  </div>
                )} */}
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        ))}
      <Breaks />
    </div>
  )
}

export default AdminPage
