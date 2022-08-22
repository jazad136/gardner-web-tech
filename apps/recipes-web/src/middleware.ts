export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/recipe/:path*", "/_next/data/:path*"],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
};
