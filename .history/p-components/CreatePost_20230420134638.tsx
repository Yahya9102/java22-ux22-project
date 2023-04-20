import { NextPage } from "next"
import styles from "p-components/styles/createPost.module.css"
import { useRouter } from "next/router"
import { User } from "@/types/users"

const CreatePost: NextPage<User> = ({}) => {
  const router = useRouter()

  const handleGoBackClick = () => {
    router.push("/")
  }
  return (
    <div>
      <fieldset className={styles.form_body}>
        <p onClick={handleGoBackClick} className={styles.link}>
          {"< Go back"}
        </p>
        <form action="">
          <label htmlFor="name" className={styles.input_label}>
            {" "}
            <strong>Name</strong>
          </label>
          <p className={styles.input_label}>What should we call you?</p>
          <br />
          <input
            type="text"
            placeholder='Ex: "Jane Doe" or "@useer01"'
            className={styles.input_fields}
          />
          <br />
          <label htmlFor="title" className={styles.input_label}>
            {" "}
            <strong>Title</strong>
          </label>
          <p className={styles.input_label}>
            Give your post a descriptive title
          </p>
          <br />
          <input
            type="text"
            name="title"
            id=""
            placeholder='Ex: "Beginner looking for a League partner"'
            className={styles.input_fields}
          />
          <br />
          <label htmlFor="text" className={styles.input_label}>
            {" "}
            <strong>Text</strong>
          </label>
          <p className={styles.input_label}>
            Who are you? And who are you looking for?
          </p>
          <br />

          <textarea
            name="text"
            id=""
            placeholder='Ex "Looking for someone to play League with. Preferably someone new to the game like me, so we can improve together."'
            cols={20}
            rows={5}
            className={styles.input_fields}
          />
          <h2>
            {" "}
            <strong>Contact Channels</strong>
          </h2>
          <br />
          <p>Add your discord channel for contact</p>
          <br />
          <div>
            <label htmlFor="discord">Discord</label>

            <br />
            <input type="text" name="discord" id="" placeholder="Ex:Discord" />
            <br />
            <label htmlFor="username">Username</label>
            <br />
            <input type="text" name="username" id="" placeholder="Ex:@user01" />
          </div>
          <br />
          <div className={styles.button_div}>
            <button type="submit" className={styles.createpost_button}>
              Post
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  )
}

export default CreatePost
