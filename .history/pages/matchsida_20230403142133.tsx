import { NextPage } from "next"
import React from "react"
import LeftSection from "@/p-components/LeftSection"
import MiddleSection from "@/p-components/MiddleSection"
import RightSection from "@/p-components/RightSection"
import MatchSideHeader from "@/p-components/MatchSideHeader"
import LinkContainer from "@/p-components/LinkContainer"
import PlayerInfo from "@/p-components/PlayerInfo"
import TableContainer from "@/p-components/TableContainer"
import RegisterForm from "@/p-components/RegisterForm"
import "./styles/main.css"

interface Props {}

const Matchsida: NextPage<Props> = ({}) => {
  return (
    <div>
      <div className="main">
        <MatchSideHeader />
        <div className="content">
          <LeftSection />
          <MiddleSection>
            <LinkContainer />
            <PlayerInfo />
            <TableContainer />
          </MiddleSection>
          <RightSection>
            <RegisterForm />
          </RightSection>
        </div>
      </div>
    </div>
  )
}

export default Matchsida
