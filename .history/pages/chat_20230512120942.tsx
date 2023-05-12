import { NextPage } from "next"
import { MyChatComponent } from "../p-components/ChatPage"

const ChatPage: NextPage = ({}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px",
      }}
    >
      <div>
        <MyChatComponent userId="1" userName="hej" otherUserId={"1"} />
      </div>
      <div>
        <MyChatComponent userId="2" userName="hej" otherUserId={"2"} />
      </div>
    </div>
  )
}

export default ChatPage
