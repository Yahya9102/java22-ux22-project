import React from "react"
import styles from "./styles/mainFooter.module.css"
import { useRouter } from "next/router"
import Image from "next/image"
import navbarImage from "../public/posticon.png"

function MainFooter() {
  const router = useRouter()

  const handleCreateButtonClick = () => {
    router.push("/createPost")
  }

  return <div></div>
}

export default MainFooter
