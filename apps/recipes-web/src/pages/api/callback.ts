import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

const cookieName = "callback-url";
const acceptableMethods = ["GET", "POST"];

const callback = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!acceptableMethods.includes(req.method)) {
    return res.status(405).json({
      error: { message: "Method not allowed" },
    });
  }

  const cookies = new Cookies(req, res);

  if (req.method === "POST") {
    const { callbackUrl } = req.body;
    cookies.set(cookieName, callbackUrl);
    res.end();
  }

  if (req.method === "GET") {
    const callbackUrl = cookies.get(cookieName);
    cookies.set(cookieName);
    res.status(200).json(JSON.stringify({ callbackUrl }));
  }
};

export default callback;
