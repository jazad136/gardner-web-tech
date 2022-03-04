import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import { tokens } from "src/lib/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);

  switch (req.method) {
    case "POST":
      const { callbackUrl } = req.body;
      cookies.set(tokens.callbackUrl, callbackUrl);
      res.status(200).json({ ok: true });
      break;
    case "GET":
      const callbackUrlFromCookie = cookies.get(tokens.callbackUrl);
      res.status(200).json({ callbackUrl: callbackUrlFromCookie });
      break;
    default:
      res.status(405).json({
        error: { message: "Method not allowed" },
      });
      break;
  }
};

export default handler;
