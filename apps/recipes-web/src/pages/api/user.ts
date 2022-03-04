import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import { tokens } from "src/lib/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);
  const didToken = cookies.get(tokens.didToken);
  if (didToken) {
    res.status(200).json({ didToken });
  } else {
    res.status(404).json({ error: "token not found" });
  }
};

export default handler;
