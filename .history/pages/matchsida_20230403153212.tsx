import React from "react"
import LeftSection from "@/p-components/LeftSection"
import MiddleSection from "@/p-components/MiddleSection"
import RightSection from "@/p-components/RightSection"
import MatchSideHeader from "@/p-components/MatchSideHeader"
import LinkContainer from "@/p-components/LinkContainer"
import PlayerInfo from "@/p-components/PlayerInfo"
import TableContainer from "@/p-components/TableContainer"
import RegisterForm from "@/p-components/RegisterForm"

function matchsida() {
  return (
    <div>
      <MatchSideHeader />
      <div>
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
  )
}

export default matchsida
