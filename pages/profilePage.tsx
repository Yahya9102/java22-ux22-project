import { NextPage } from "next"
import NavBarLeftSide from "@/p-components/navBarLeftSide"
import TopHeader from "@/p-components/topHeader"
import ContentFrame from "@/p-components/contentFrame"

interface Props {}

const ProfilePage: NextPage<Props> = ({}) => {
  return (
    <div>
      {/* <TopHeader /> */}
      {/* <NavBarLeftSide /> */}
      <ContentFrame />
    </div>
  )
}

export default ProfilePage
