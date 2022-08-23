import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { AuthOptions } from "src/lib";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { provider },
    method,
  } = req;

  if (method !== "DELETE" || typeof provider !== "string") {
    return res.status(401).end();
  }

  try {
    const session = await unstable_getServerSession(req, res, AuthOptions);
    const email = session?.user?.email;

    if (!email) {
      return res.status(500).end();
    }

    const account = await prisma.account.findFirst({
      where: { provider, AND: [{ user: { email } }] },
    });

    if (!account) {
      return res.status(500).end();
    }

    await prisma.account.delete({
      where: {
        id: account.id,
      },
    });
  } catch {
    return res.status(500).end();
  }

  return res.status(204).end();
};

export default handler;
