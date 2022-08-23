import { DateTime } from "luxon";
import { NextAuthOptions } from "next-auth";
// eslint-disable-next-line import/no-named-as-default
import EmailProvider from "next-auth/providers/email";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { createTransport } from "nodemailer";
import { html, text } from "src/lib/email";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const approvedEmails = (process.env.APPROVED_EMAILS as string).split(", ");
const prisma = new PrismaClient();

const AuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host } = new URL(url);
        const transport = createTransport(server);
        const timeString = DateTime.now().toFormat("fff");

        const result = await transport.sendMail({
          to: email,
          from: `"Gardner Web and Tech" <${from}>`,
          replyTo: process.env.EMAIL_REPLY_TO,
          subject: "Sign into Recipes",
          text: text({ url, host }),
          html: html({ url, host, email, timeString }),
        });

        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn({ user }) {
      return approvedEmails
        .map((email) => email.toLowerCase())
        .includes(user.email.toLowerCase());
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
};

export default AuthOptions;
