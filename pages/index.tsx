import React from "react";
import { NextPage } from "next";
import MainFooter from "@/p-components/MainFooter";
import MiddleSection from "@/p-components/MiddleSection";



interface Props{}

const Index: NextPage<Props> = ({}) => {
  return(
    <div>
      <MainFooter/>
    </div>
  )
}

export default Index