// eslint-disable-next-line import/no-named-as-default
import CredentialsProvider from "next-auth/providers/credentials";
import { Magic } from "@magic-sdk/admin";
import NextAuth from "next-auth";
import * as Pino from "pino";

const logger = Pino.default({ name: "NextAuth" });
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_KEY,
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Magic Link",
      credentials: {
        didToken: { label: "DID Token", type: "text" },
      },
      async authorize({ didToken }) {
        try {
          magic.token.validate(didToken);
        } catch {
          logger.warn(didToken, "User is invalid. token: %s", didToken);
          return null;
        }
        const metadata = await magic.users.getMetadataByToken(didToken);

        return {
          email: metadata.email,
          name: metadata.email,
        };
      },
    }),
  ],
});
