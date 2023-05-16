import { useState } from "react"
import { NextPage } from "next"
import router from "next/router"
import styles from "p-components/styles/adminLogin.module.css"

const AdminLogin: NextPage = () => {
  const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
  })

  const handleLoginClick = () => {
    if (
      adminCredentials.username === ADMIN_USERNAME &&
      adminCredentials.password === ADMIN_PASSWORD
    ) {
      sessionStorage.setItem("isAdminLoggedIn", "true")
      router.push("/admin")
    } else {
      alert("Invalid admin username or password")
    }
  }

  const handleLogoutClick = () => {
    sessionStorage.removeItem("isAdminLoggedIn")
    router.push("/adminLogin")
  }

  return (
    <div>
    <div className={styles.admin_header}>
      <strong>Admin</strong>
    </div>

    <div className={styles.admin_body}>
      <fieldset className={styles.admin_fieldset}>
        <label htmlFor="adminUsername" className={styles.label}>
          <strong>Admin Log In</strong>
        </label>
        <br />
        <input
          className={styles.input_fields}
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

        <input
          className={styles.input_fields}
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
          placeholder="Password"
        />
        <br />
        <button className={styles.adminLogin_button} onClick={handleLoginClick}>
          Log in
        </button>
      </fieldset>
    </div>
    </div>)
}

export default AdminLogin
