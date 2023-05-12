import { useEffect, useRef, useState } from "react"
import Talk from "talkjs"
import styles from "p-components/styles/chatPage.module.css"

interface MyChatComponentProps {
  userId: string
  userName: string
  otherUserId: string
}

export const MyChatComponent: React.FC<MyChatComponentProps> = ({
  userId,
  userName,
  otherUserId,
}) => {
  const chatboxEl = useRef<HTMLDivElement>(null)
  const [talkLoaded, markTalkLoaded] = useState(false)
  const [otherUser, setOtherUser] = useState<any>(null)

  // Fetch the other user's details when the component mounts
  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        const response = await fetch(`/api/user?id=${otherUserId}`)
        const data = await response.json()
        setOtherUser(data)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchOtherUser()
  }, [otherUserId])

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true))

    if (talkLoaded && otherUser) {
      const currentUser = new Talk.User({
        id: userId,
        name: userName,
        role: "default",
      })

      const otherTalkUser = new Talk.User({
        id: otherUser.id,
        name: otherUser.name,
        role: "default",
      })

      const session = new Talk.Session({
        appId: "tgbJr06e",
        me: currentUser,
      })

      const conversationId = Talk.oneOnOneId(currentUser, otherTalkUser)
      const conversation = session.getOrCreateConversation(conversationId)
      conversation.setParticipant(currentUser)
      conversation.setParticipant(otherTalkUser)

      const chatbox = session.createChatbox()
      chatbox.select(conversation)
      chatbox.mount(chatboxEl.current!)

      return () => session.destroy()
    }
  }, [talkLoaded, userId, userName, otherUser])

  return <div ref={chatboxEl} className={styles.chatContainer} />
}
