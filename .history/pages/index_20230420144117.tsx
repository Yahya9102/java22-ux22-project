import { NextPage } from "next"
import PlayerInfo from "@/p-components/PlayerInfo"
import MainFooter from "@/p-components/MainFooter"
import Header from "@/p-components/header"
import { User } from "@/types/users"

const Index: NextPage<User> = ({}) => {
  return (
    <div>
      <Header />
      <h1 className="text-center">
        <strong>Posts</strong>
      </h1>

      <PlayerInfo />
      <div className={""}>p</div>
      <MainFooter />
    </div>
  )
}

export default Index
