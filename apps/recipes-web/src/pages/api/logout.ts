import { NextApiRequest, NextApiResponse } from "next";
import { Magic } from "@magic-sdk/admin";
import Cookies from "cookies";
import { tokens } from "src/lib/constants";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);
  const didToken = cookies.get(tokens.didToken);
  if (didToken) {
    await magic.users.logoutByToken(didToken);
  } else {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      await magic.users.logoutByToken(authHeader);
    }
  }
  cookies.set(tokens.didToken);
  res.status(200).json({ authenticated: false });
};

export default handler;
