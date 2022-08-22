export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/recipe/:path*", "/_next/data/:path*"],
};
