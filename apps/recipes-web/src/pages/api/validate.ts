import { NextApiRequest, NextApiResponse } from "next";
import { Magic } from "@magic-sdk/admin";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const didToken = req.headers["authorization"]?.substring(7);

  try {
    magic.token.validate(didToken);
    res.status(200).json({ authenticated: true });
  } catch (error) {
    res.status(401).json({ authenticated: false });
  }
};

export default handler;
