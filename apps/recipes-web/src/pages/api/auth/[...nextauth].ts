import { DateTime } from "luxon";
import NextAuth from "next-auth";
// eslint-disable-next-line import/no-named-as-default
import EmailProvider from "next-auth/providers/email";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { createTransport } from "nodemailer";
import { html, text } from "src/lib/email";

const approvedEmails = (process.env.APPROVED_EMAILS as string).split(", ");

// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL as string,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
// });

export default NextAuth({
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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      return Promise.resolve(approvedEmails.includes(user.email));
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
});
