import { NextApiRequest, NextApiResponse } from "next";
import { Magic } from "@magic-sdk/admin";
import Cookies from "cookies";

const cookieName = "did-token";
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cookies = new Cookies(req, res);
    const didToken = cookies.get(cookieName);
    if (didToken) {
      await magic.users.logoutByToken(didToken);
    }
    cookies.set(cookieName);
    res.status(200).json({ authenticated: false });
  } catch {
    res.status(500);
  }
}
