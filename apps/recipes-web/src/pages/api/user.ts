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
    res.status(200).json({ didToken });
  } catch {
    res.status(500);
  }
}
