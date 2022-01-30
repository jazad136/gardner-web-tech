import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { signIn } from "next-auth/react";

const secret = process.env.JWT_KEY;

const error = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret });

  if (token) {
    signIn("credentials", { token });
  }

  res.redirect(301, "/login");
};

export default error;
