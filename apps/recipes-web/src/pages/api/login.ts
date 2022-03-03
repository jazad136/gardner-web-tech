import { NextApiRequest, NextApiResponse } from "next";
import { Magic } from "@magic-sdk/admin";
import Cookies from "cookies";

const cookieName = "did-token";
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const didToken = req.headers.authorization.substring(7);
    magic.token.validate(didToken);
    const cookies = new Cookies(req, res);
    cookies.set(cookieName, didToken);
    res.status(200).json({ authenticated: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
