import { NextPage } from "next"
import PlayerInfo from "@/p-components/PlayerInfo"
import MainFooter from "@/p-components/MainFooter"
import Header from "@/p-components/header"

interface Props {}

const Index: NextPage<Props> = ({}) => {
  return (
    <div>
      <Header />
      <h1>
        <strong>Posts</strong>
      </h1>
      <PlayerInfo name={""} infoPost={""} discord={""} />
      <MainFooter />
    </div>
  )
}

export default Index
