import { NextPage } from "next"
import CreateUserPosts from "@/p-components/CreateUserPosts"
import Header from "@/p-components/header"
import MainFooter from "@/p-components/MainFooter"
import { User } from "@/types/users"

const CreatePost: NextPage<User> = ({}) => {
  return (
    <div>
      <Header />

      <MainFooter />
    </div>
  )
}

export default CreatePost
