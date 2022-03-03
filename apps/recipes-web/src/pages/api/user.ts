import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

const cookieName = "did-token";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cookies = new Cookies(req, res);
    const didToken = cookies.get(cookieName);
    if (didToken) {
      res.status(200).json({ didToken });
    } else {
      res.status(404).json({ error: "token not found" });
    }
  } catch {
    res.status(500);
  }
}
