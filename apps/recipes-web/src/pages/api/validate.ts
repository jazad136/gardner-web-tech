import { NextApiRequest, NextApiResponse } from "next";
import { Magic } from "@magic-sdk/admin";
import Cookies from "cookies";
import { tokens } from "../../lib/constants";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);
  const didToken = cookies.get(tokens.didToken) ?? req.headers["authorization"];

  try {
    magic.token.validate(didToken);
    res.status(200).json({ authenticated: true });
  } catch (error) {
    res.status(401).json({ authenticated: false });
  }
};

export default handler;
