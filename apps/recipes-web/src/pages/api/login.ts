import { NextApiRequest, NextApiResponse } from "next";
import { Magic } from "@magic-sdk/admin";
import Cookies from "cookies";
import { tokens } from "src/lib/constants";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  try {
    const { didToken } = req.body;
    magic.token.validate(didToken);

    const cookies = new Cookies(req, res);
    cookies.set(tokens.didToken, didToken, { httpOnly: true });

    res.status(200).json({ authenticated: true });
  } catch {
    res.status(500).json({ error: "Could not log in user" });
  }
};

export default handler;
