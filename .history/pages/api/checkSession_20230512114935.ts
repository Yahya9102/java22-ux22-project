import { NextApiRequest, NextApiResponse } from "next"
import { parse } from "cookie"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = req.headers.cookie && parse(req.headers.cookie)
  if (cookies && cookies.session) {
    const email = cookies.session

    // Respond with the user's email
    res.status(200).json({ loggedIn: true, email })
  } else {
    res.status(200).json({ loggedIn: false })
  }
}

export default handler
