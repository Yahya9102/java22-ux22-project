import { NextPage } from "next"
import { useEffect, useState } from "react"
import { User } from "@/types/users"
import router from "next/router"
import Breaks from "./breaks"
import styles from "p-components/styles/playerInfo.module.css"
import style from "p-components/styles/adminPage.module.css"
import withAdminAuth from "./withAdminAuth"

const AdminPage: NextPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("isAdminLoggedIn") === "true") {
      setIsLoggedIn(true)
      router.push("admin")
    }
  }, [])

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

  const [showEditForm, setShowEditForm] = useState(true)

  // handle visibility of the edit form
  const handleToggleClick = () => {
    setShowEditForm(!showEditForm)
  }

  // a variable for the input values
  const [editValues, setEditValues] = useState({
    id: "",
    name: "",
    location: "",
    title: "",
    post: "",
    discord: "",
  })

  // preset the input values to the current posts values
  const handleShowInputFormClick = async (user: User) => {
    setShowEditForm(true)
    setEditValues({
      id: user._id,
      name: user.name,
      location: user.location,
      title: user.title,
      post: user.post,
      discord: user.discord,
    })
  }

  // An asyncronous function which takes edit values and update/patch it
  const handleEditSubmit = async (_id: string, user: User) => {
    const shouldEdit = window.confirm("Would you like to save changes?")
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
        `http://localhost:3000/api/editUser?id=${_id}`,
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

  return (
    <div>
      {Array.isArray(users) &&
        users.map((user) => (
          <fieldset
            className={style.fieldset_body}
            key={JSON.stringify(user._id)}
          >
            <table>
              <thead>
                <tr>
                  <th className={style.tableHeader_PlayerInfo}>
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
                      className={style.delete_button}
                    >
                      Delete
                    </button>
                    <button
                      className={style.edit_button}
                      onClick={() => handleShowInputFormClick(user)}
                    >
                      Edit
                    </button>
                    {editValues.id === user._id && showEditForm && (
                      <>
                        <div>
                          <h2 className={style.h2_admin}>Edit post:</h2>
                          <fieldset>
                            <form>
                              <label
                                htmlFor="editName"
                                className={style.input_label}
                              >
                                Edit name:
                              </label>
                              <br />
                              <input
                                type="text"
                                name="editName"
                                id="editName"
                                placeholder="Edit the name?"
                                value={editValues.name}
                                onChange={(e) =>
                                  setEditValues({
                                    ...editValues,
                                    name: e.target.value,
                                  })
                                }
                                className={style.input_fields}
                              />
                              <br />
                              <label
                                htmlFor="editLocation"
                                className={style.input_label}
                              >
                                Edit location:
                              </label>
                              <br />
                              <input
                                type="text"
                                name="editLocation"
                                id="editLocation"
                                placeholder="Edit the location?"
                                value={editValues.location}
                                onChange={(e) =>
                                  setEditValues({
                                    ...editValues,
                                    location: e.target.value,
                                  })
                                }
                                className={style.input_fields}
                              />
                              <br />
                              <label
                                htmlFor="editTitle"
                                className={style.input_label}
                              >
                                Edit title:
                              </label>
                              <br />
                              <input
                                type="text"
                                name="editTitle"
                                id="editTitle"
                                placeholder="Edit the title?"
                                value={editValues.title}
                                onChange={(e) =>
                                  setEditValues({
                                    ...editValues,
                                    title: e.target.value,
                                  })
                                }
                                className={style.input_fields}
                              />
                              <br />
                              <label
                                htmlFor="editPost"
                                className={style.input_label}
                              >
                                Edit post:
                              </label>
                              <br />
                              <textarea
                                name="editPost"
                                id="editPost"
                                placeholder="Edit the post?"
                                value={editValues.post}
                                onChange={(e) =>
                                  setEditValues({
                                    ...editValues,
                                    post: e.target.value,
                                  })
                                }
                                className={style.input_field_desc}
                              />
                              <br />
                              <label
                                htmlFor="editDiscord"
                                className={style.input_label}
                              >
                                Edit discord name:
                              </label>
                              <br />
                              <input
                                type="text"
                                name="editDiscord"
                                id="editDiscord"
                                placeholder="Edit the discord name?"
                                value={editValues.discord}
                                onChange={(e) =>
                                  setEditValues({
                                    ...editValues,
                                    discord: e.target.value,
                                  })
                                }
                                className={style.input_fields}
                              />
                            </form>
                          </fieldset>
                          <br />
                          <button
                            className={style.save_button}
                            onClick={() =>
                              handleEditSubmit(user._id.toString(), user)
                            }
                          >
                            Save post
                          </button>
                          <button
                            className={style.cancel_button}
                            onClick={() => handleToggleClick()}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    )}
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

export default withAdminAuth(AdminPage)
