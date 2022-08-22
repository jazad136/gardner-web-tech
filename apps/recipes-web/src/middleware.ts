export { default } from "next-auth/middleware";

export const config = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
};
